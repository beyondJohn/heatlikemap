import { Component, OnInit } from '@angular/core';
interface IHeatMapItem {
  tool_name: string;
  category_id: number;
  tool_id: number;
  layer_id: number;
  actionable: 1;
  parent: string;
  name: string;
}
interface IInitLayerArray {
  layerNum: number;
  categoryName: string;
  toolArray: number[];
}
interface IMatch {
  position: number;
  matchingLayerIds: number[];
  matchingToolId: number;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  layerArray = [10, 11, 12, 13, 8, 9, 7, 2];
  title = 'heatmap';
  tempData = [];
  data: IHeatMapItem[] = [
    {
      "tool_name": "GTAC"
      , "category_id": 19
      , "tool_id": 7
      , "layer_id": 2
      , "actionable": 1
      , "parent": "Access"
      , "name": "Identification"
    }
    , { "tool_name": "NESA", "category_id": 19, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "NESA", "category_id": 19, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "NESA", "category_id": 19, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Identification" }
    , { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "NESA", "category_id": 20, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "NESA", "category_id": 20, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "NESA", "category_id": 20, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authentication" }
    , { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "MUAM", "category_id": 21, "tool_id": 10, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "MUAM", "category_id": 21, "tool_id": 10, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "MUAM", "category_id": 21, "tool_id": 10, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authorization" }
    , { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }
    , { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }]

  ngOnInit() {
    this.createInitLayerArrays();
  }
  matches: IMatch[] = [];
  findIdenticalsiblings() {

    let goToNext = true;
    // find matching siblings
    // iterate layer arrays
    for (let i = 0; i < this.layerCategoryObjectArray.length; i++) {
      goToNext = true;
      // get length of tool array
      const toolArrayLength = this.layerCategoryObjectArray[i].toolArray.length;

      // check next sibling (below) for matching tool ids
      for (let t = 0; t < toolArrayLength; t++) { // t = tool index

        //let isInit = true;
        try {
          // get length of sibling tool array
          const siblingToolArrayLength = this.layerCategoryObjectArray[i + 1].toolArray.length;
          for (let sibtool = 0; sibtool < siblingToolArrayLength; sibtool++) {

            // look for matching tools in sibling
            if (this.layerCategoryObjectArray[i].toolArray[t] === this.layerCategoryObjectArray[i + 1].toolArray[sibtool]) {
              // check if tool id already handled
              let alreadyHandled = false;
              if (this.matches.length > 0) {
                for (let mm = 0; mm < this.matches.length; mm++)// mm has no l;ogical meaning
                {
                  if (this.matches[mm].matchingToolId === this.layerCategoryObjectArray[i].toolArray[t]) {
                    alreadyHandled = true;
                  }
                }
              }
              if (!alreadyHandled) {
                // add sibling match record 
                const match: IMatch = {
                  position: i,
                  matchingLayerIds: [this.layerCategoryObjectArray[i].layerNum, this.layerCategoryObjectArray[i + 1].layerNum],
                  matchingToolId: this.layerCategoryObjectArray[i + 1].toolArray[sibtool]
                }
                // check all other layers in any position for matching tool
                for (let n = i + 1; n < this.layerCategoryObjectArray.length; n++) { // n has no logical meaning
                  // iterate through each tool array
                  for (let p = 0; p < this.layerCategoryObjectArray[n].toolArray.length; p++) { // p has no logical meaning
                    const toolId = this.layerCategoryObjectArray[n].toolArray[p];
                    //check if tool id matches match object
                    if (toolId === match.matchingToolId) {
                      // check if layer id in array yet
                      if (!match.matchingLayerIds.includes(this.layerCategoryObjectArray[n].layerNum)) {
                        //get min layer id in match.matchingLayerIds to check if next match is actually lower immediate sibling
                        const minCheck = match.matchingLayerIds[match.matchingLayerIds.length - 1];
                        if (minCheck - 1 === this.layerCategoryObjectArray[n].layerNum)
                          match.matchingLayerIds.push(this.layerCategoryObjectArray[n].layerNum);
                      }
                    }
                  }
                }
                this.matches.push(match);
                goToNext = false;
              }
            }
          }
        }
        catch{

        }
      }
    }
    console.log('matches: ', this.matches);
    console.log('this.layerCategoryObjectArray: ', this.layerCategoryObjectArray);

    // this.layerCategoryObjectArray
    console.log('layerArrayDesc: ', this.layerArrayDesc);
  }
  layerCategoryObjectArray: IInitLayerArray[] = []
  layerArrayDesc = [];
  createInitLayerArrays() {

    // create layer array descending
    this.layerArrayDesc = [...this.layerArray];
    this.layerArrayDesc.sort(function (a, b) { return b - a });

    // const categories = ['Authenication','authorization','ILM'] ;
    const categories = ['Authentication'];
    let layerCategoryObject: IInitLayerArray;
    // create objects for each category
    for (let c = 0; c < categories.length; c++) {
      // iterate through layers and build init arrays
      for (let i = 0; i < this.layerArrayDesc.length; i++) {
        // create layer category object
        layerCategoryObject = {
          categoryName: categories[c],
          layerNum: this.layerArrayDesc[i],
          toolArray: []
        }
        // populate layer category object's tool array
        this.data.map(x => {
          // find tools asigned to layer and category
          if (x.name === categories[c] && x.layer_id === this.layerArrayDesc[i]) {
            // check if tool id already in array
            if (!layerCategoryObject.toolArray.includes(x.tool_id)) {
              // add tool id to array
              layerCategoryObject.toolArray.push(x.tool_id)
            }
          }
        });
        this.layerCategoryObjectArray.push(layerCategoryObject);
      }
    }
    // use  layers array to search for matching siblings
    this.findIdenticalsiblings();
  }

}
