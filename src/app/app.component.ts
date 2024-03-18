import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { SurveyCreatorModel } from "survey-creator-core";

const defaultJson = {"pages":[{"name":"Name","elements":[{"type":"text","name":"FirstName","title":"Enter your first name:"},{"type":"text","name":"LastName","title":"Enter your last name:"},{"type":"paneldynamic","name":"question1"}]}]}
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
  showJSONEditorTab: false

};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,SurveyCreatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'surveyJs';
  surveyCreatorModel!: SurveyCreatorModel;
  ngOnInit() {
    const creator = new SurveyCreatorModel(creatorOptions);
    creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
    this.surveyCreatorModel = creator;
    creator.saveSurveyFunc = (saveNo: number, callback: Function) => { 
      // If you use localStorage:
      window.localStorage.setItem("survey-json", creator.text);
      callback(saveNo, true);

      // If you use a web service:
      this.saveSurveyJson(
          "https://your-web-service.com/",
          creator.JSON,
          saveNo,
          callback
      );
    };
  }


  saveSurveyJson(url: string | URL, json: object, saveNo: number, callback: Function) {
    console.log(JSON.stringify(json));

    
      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json;charset=UTF-8'
      //   },
      //   body: JSON.stringify(json)
      // })
      // .then(response => {
      //   if (response.ok) {
      //     callback(saveNo, true);
      //   } else {
      //     callback(saveNo, false);
      //   }
      // })
      // .catch(error => {
      //   callback(saveNo, false);
      // });
    
    
}
}
