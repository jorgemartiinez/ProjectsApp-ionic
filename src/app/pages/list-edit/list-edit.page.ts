import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { List, Category } from './../../interfaces/interfaces';
import { DbService } from './../../services/db.service';

@Component({
    selector: 'app-list-edit',
    templateUrl: './list-edit.page.html',
    styleUrls: [ './list-edit.page.scss' ]
})
export class ListEditPage implements OnInit {
    id: string;
    list: List = {
        name: '',
        category_id: 'nulled'
    };

    category: Category = {};

    constructor(private activatedRoute: ActivatedRoute, public db: DbService, private navCtrl: NavController) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                this.list = this.db.searchListById(this.id);
                if (this.list.category_id == null) {
                    this.list.category_id = 'nulled';
                }
            } else {
                this.list.color = '#FF4444';
            }
        });
    }

    async editList(editListForm: NgForm) {
        console.log(editListForm);
        console.log(this.list);
        if (editListForm.invalid) {
            return;
        }

        if (!this.id) {
            await this.db.addList(this.list);
            this.navCtrl.back();
            return;
        }

        await this.db.editList(this.list);
        this.navCtrl.back();
        return;
    }

    applyStyle(color: string) {
        const styles = { 'background-color': color };
        return styles;
    }

    update(value: string) {
        console.log('value before button click' + this.list.color);
        this.list.color = value;
        console.log('value after button click' + this.list.color);
    }
}
