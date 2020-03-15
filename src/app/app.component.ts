import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { threadId } from 'worker_threads';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  matchingToolName: string;

}
interface ILayerCount {
  layer: number;
  count: number;
}
interface IRectifyDifferentColumnTotalMatch {
  layerId: number;
  position: number;
  toolId: number;
  matchingToolName: string;
}
interface IProcessed {
  position: number;
  layers: number[];
}
interface IToolNameWidth {
  toolId: number;
  toolName: string;
  displayWidth: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  toolNamesWidth: IToolNameWidth[] = [{ "displayWidth": 43, "toolId": 7, "toolName": "GTAC" }, { "displayWidth": 42, "toolId": 8, "toolName": "NESA" }, { "displayWidth": 52, "toolId": 10, "toolName": "MUAM" }, { "displayWidth": 184, "toolId": 9, "toolName": "Global Logon/CSP/HALO.*" }, { "displayWidth": 45, "toolId": 9, "toolName": "Global" }, { "displayWidth": 97, "toolId": 9, "toolName": "Global Logon" }, { "displayWidth": 137, "toolId": 9, "toolName": "Logon/CSP/HALO.*" }, { "displayWidth": 91, "toolId": 9, "toolName": "CSP/HALO.*" }, { "displayWidth": 76, "toolId": 11, "toolName": "AAF/CADI" }, { "displayWidth": 159, "toolId": 5, "toolName": "Access Portal/MyLogins" }, { "displayWidth": 47, "toolId": 5, "toolName": "Access" }, { "displayWidth": 111, "toolId": 5, "toolName": "Portal/MyLogins" }, { "displayWidth": 45, "toolId": 6, "toolName": "SUITS" }];
  myColor = ['#6F2F9F', '#009EDA'];
  RectifyDifferentColumnTotalMatch: IRectifyDifferentColumnTotalMatch[] = [];
  layersToolTotal: ILayerCount[] = [];
  matches: IMatch[] = [];
  layerCategoryObjectArray: IInitLayerArray[] = []
  layerArrayDesc = [];
  layerArray = [10, 11, 12, 13, 8, 9, 7, 2, 1, 3, 4, 5, 6];
  title = 'heatmap';
  tempData = [];
  data: IHeatMapItem[] = [
    { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "NESA", "category_id": 19, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "NESA", "category_id": 19, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "NESA", "category_id": 19, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "MUAM", "category_id": 19, "tool_id": 10, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 19, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Identification" }
    , { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 19, "tool_id": 9, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Identification" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "NESA", "category_id": 20, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "NESA", "category_id": 20, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "NESA", "category_id": 20, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "MUAM", "category_id": 20, "tool_id": 10, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authentication" }
    , { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 20, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "Global Logon/CSP/HALO.*", "category_id": 20, "tool_id": 9, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authentication" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "MUAM", "category_id": 21, "tool_id": 10, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "MUAM", "category_id": 21, "tool_id": 10, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "MUAM", "category_id": 21, "tool_id": 10, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authorization" }
    , { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 21, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "NESA", "category_id": 21, "tool_id": 8, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "AAF/CADI", "category_id": 21, "tool_id": 11, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "Authorization" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 2, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 5, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 8, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 9, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }
    , { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 10, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 11, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 12, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "Access Portal/MyLogins", "category_id": 22, "tool_id": 5, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "SUITS", "category_id": 22, "tool_id": 6, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "GTAC", "category_id": 22, "tool_id": 7, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }, { "tool_name": "NESA", "category_id": 22, "tool_id": 8, "layer_id": 13, "actionable": 1, "parent": "Access", "name": "ILM" }]
  // GTAC 7
  // NESA 8
  // Global Logon/CSP/HALO.*  9
  // MUAM 10
  ngOnInit() {
    this.countToolsForEachLayer();
    this.createLayerArrays();
    // this.debugAuthorization();

  }
  processed: IProcessed[] = [];
  runningHeight = 0;
  runningWidth = 0
  position = 0;

  debugAuthorization() {
    const checkAuthorizationData9 = this.data.filter(x => x.category_id === 21 && x.layer_id === 9);
    console.log('checkAuthorizationData9: ', checkAuthorizationData9);
    const checkAuthorizationData8 = this.data.filter(x => x.category_id === 21 && x.layer_id === 8);
    console.log('checkAuthorizationData8: ', checkAuthorizationData8);
  }

  drawSVGs() {
    const singleLayerHeight = 40;
    const categoryWidth = 250;
    // go across layer positions
    // check layer
    var svg = document.getElementsByTagName('svg')[0]; //Get svg element
    let pathHeight = 0
    // iterate over each layer, top down
    this.layerArrayDesc.forEach(layerid => {
      //get number of columns needed for layer from layersToolTotal
      const toolCount = this.layersToolTotal.filter(x => x.layer === layerid)[0].count;
      // add blank row if layer has no tool
      // if (toolCount === 0) {
      //   // create single solid pruple row for layers without tools
      //   var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //Create a path in SVG's namespace
      //   newElement.setAttribute('d', 'M' + this.runningWidth + ' ' + this.runningHeight + ' h' + categoryWidth + ' v' + singleLayerHeight + ' h-' + categoryWidth + ' z'); //Set path's data
      //   newElement.style.stroke = '#fff'; //Set stroke colour
      //   newElement.style.fill = '#6F2F9F';
      //   newElement.style.strokeWidth = '5px'; //Set stroke width
      //   svg.appendChild(newElement);
      //   //add text element
      //   var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
      //   textElement.setAttribute('x', String(this.runningWidth + (((categoryWidth / 2) - 12) - 12))); // second 12 should actually be double length of text string
      //   textElement.setAttribute('y', String(this.runningHeight + 24));
      //   textElement.setAttribute('fill', '#fff');
      //   textElement.style.fontSize = '12px';
      //   var textNode = document.createTextNode('myText');
      //   textElement.appendChild(textNode);
      //   svg.appendChild(textElement);
      // }
      // process all columns
      for (let col = 0; col < toolCount; col++) // col = column
      {
        const findProcessed = this.processed.filter(x => x.position === col && x.layers.includes(layerid));
        if (findProcessed.length === 0) {


          // find if layer has matching siblings
          const matchingRecords = this.matches.filter(x => x.matchingLayerIds.includes(layerid));
          console.log('matchingRecords:', matchingRecords);

          if (matchingRecords.length > 0 && matchingRecords.filter(x => x.position === col)[0]) {
            // total matches
            const totalSiblings = matchingRecords.filter(x => x.position === col)[0].matchingLayerIds.length;
            // set height for SVG Path
            pathHeight = totalSiblings * singleLayerHeight;
            const pathWidth = categoryWidth / toolCount;
            if (matchingRecords.filter(y => y.matchingToolId)[col]) {


              const toolId = this.matches.filter(x => x.matchingToolId === matchingRecords.filter(y => y.matchingToolId)[col].matchingToolId)[0].matchingToolId;
              var toolName = this.matches.filter(x => x.matchingToolId === matchingRecords.filter(y => y.matchingToolId)[col].matchingToolId)[0].matchingToolName;
              if (toolId === 9) { // Global Logon/CSP/HALO.*
                // special text processing for long strings
                var toolNameWidth = this.toolNamesWidth1.filter(x => x.toolId === toolId)[2].displayWidth;

                var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //Create a path in SVG's namespace
                newElement.setAttribute('d', 'M' + this.runningWidth + ' ' + this.runningHeight + ' h' + pathWidth + ' v' + pathHeight + ' h-' + pathWidth + ' z'); //Set path's data
                newElement.style.stroke = '#fff'; //Set stroke colour
                newElement.style.fill = '#009EDA';
                newElement.style.strokeWidth = '5px'; //Set stroke width
                svg.appendChild(newElement);

                var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
                textElement.setAttribute('x', String(((pathWidth / 2) - (toolNameWidth / 2)) + this.runningWidth));
                textElement.setAttribute('y', String((pathHeight / 2) + (this.runningHeight - 5)));
                textElement.setAttribute('fill', '#fff');
                textElement.style.fontSize = '12px';
                // textElement.setAttribute('stroke-width','1px');
                // var toolName = this.matches.filter(x => x.matchingToolId === matchingRecords.filter(y => y.matchingToolId)[col].matchingToolId)[0].matchingToolName

                var textNode = document.createTextNode('Global Logon/');
                // var textNode = document.createTextNode(String(toolName.length));
                textElement.appendChild(textNode);
                svg.appendChild(textElement);
                // add text elements
                var toolNameWidth1 = this.toolNamesWidth1.filter(x => x.toolId === toolId)[4].displayWidth;
                var textElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
                textElement1.setAttribute('x', String(((pathWidth / 2) - (toolNameWidth1 / 2)) + this.runningWidth));
                textElement1.setAttribute('y', String((pathHeight / 2) + (this.runningHeight + 15)));
                textElement1.setAttribute('fill', '#fff');
                textElement1.style.fontSize = '12px';
                var textNode1 = document.createTextNode('CSP/HALO.*');
                textElement1.appendChild(textNode1);
                svg.appendChild(textElement1);

              }
              else if (toolId === 5) { // Access Portal/MyLogins
                // special text processing for long strings
                var toolNameWidth = this.toolNamesWidth1.filter(x => x.toolId === toolId)[1].displayWidth;

                var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //Create a path in SVG's namespace
                newElement.setAttribute('d', 'M' + this.runningWidth + ' ' + this.runningHeight + ' h' + pathWidth + ' v' + pathHeight + ' h-' + pathWidth + ' z'); //Set path's data
                newElement.style.stroke = '#fff'; //Set stroke colour
                newElement.style.fill = '#009EDA';
                newElement.style.strokeWidth = '5px'; //Set stroke width
                svg.appendChild(newElement);

                var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
                textElement.setAttribute('x', String(((pathWidth / 2) - (toolNameWidth / 2)) + this.runningWidth));
                textElement.setAttribute('y', String((pathHeight / 2) + (this.runningHeight - 10)));
                textElement.setAttribute('fill', '#fff');
                textElement.style.fontSize = '12px';
                var textNode = document.createTextNode('Access');
                textElement.appendChild(textNode);
                svg.appendChild(textElement);

                // add text elements 2
                var toolNameWidth1 = this.toolNamesWidth1.filter(x => x.toolId === toolId)[2].displayWidth;
                var textElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
                textElement1.setAttribute('x', String(((pathWidth / 2) - (toolNameWidth1 / 2)) + this.runningWidth));
                textElement1.setAttribute('y', String((pathHeight / 2) + (this.runningHeight + 5)));
                textElement1.setAttribute('fill', '#fff');
                textElement1.style.fontSize = '12px';
                var textNode1 = document.createTextNode('Portal/');
                textElement1.appendChild(textNode1);
                svg.appendChild(textElement1);

                // add text elements 3
                var toolNameWidth2 = this.toolNamesWidth1.filter(x => x.toolId === toolId)[3].displayWidth;
                var textElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
                textElement2.setAttribute('x', String(((pathWidth / 2) - (toolNameWidth2 / 2)) + this.runningWidth));
                textElement2.setAttribute('y', String((pathHeight / 2) + (this.runningHeight + 20)));
                textElement2.setAttribute('fill', '#fff');
                textElement2.style.fontSize = '12px';
                var textNode2 = document.createTextNode('MyLogins');
                textElement2.appendChild(textNode2);
                svg.appendChild(textElement2);

              }
              else {

                console.log('check position matchingRecords[col]: ',matchingRecords[col].position )
                // make sure to place the SVG rectangle in to correct colummn
                // calculate horizontal position of rectangle by multiplying pathWidth by col, pathwidth is
                // a calculated value of categoryWidth/toolCount
                let positionCalculated = col !== 0 ? pathWidth * col : this.runningWidth
                // standard text processing
                var toolNameWidth = this.toolNamesWidth1.filter(x => x.toolId === toolId)[0].displayWidth;

                var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //Create a path in SVG's namespace
                newElement.setAttribute('d', 'M' + positionCalculated + ' ' + this.runningHeight + ' h' + pathWidth + ' v' + pathHeight + ' h-' + pathWidth + ' z'); //Set path's data
                newElement.style.stroke = '#fff'; //Set stroke colour
                newElement.style.fill = '#009EDA';
                newElement.style.strokeWidth = '5px'; //Set stroke width
                svg.appendChild(newElement);
                var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //Create text element in SVG's namespace
                textElement.setAttribute('x', String(((pathWidth / 2) - (toolNameWidth / 2)) + positionCalculated));
                textElement.setAttribute('y', String((pathHeight / 2) + (this.runningHeight + 5)));
                textElement.setAttribute('fill', '#fff');
                textElement.style.fontSize = '12px';
                var textNode = document.createTextNode(toolName);
                textElement.appendChild(textNode);
                svg.appendChild(textElement);

              }

            }

            this.runningWidth += pathWidth;
            const processed: IProcessed = {
              layers: [...matchingRecords[col].matchingLayerIds],
              position: col
            }
            this.processed.push(processed);
          }
          else {
            // check for tools without vertical siblings
          }
          if (col === toolCount - 1)
            this.runningHeight += pathHeight;
        }
      }
      this.runningWidth = 0;
    });
    console.log('this.processed: ', this.processed);
  }

  recitifyLayerMatches() {
    // some matches may need to be moved if they vertically cross over layers with
    // different column totals 
    // **EXAMPLE: GTAC in layers 8-13 is a good example
    // layers 8 & 9 have 3 columns but 10-13 have 2 columns, so
    // the 'matches' array needs to move layers 8-9 out of position 0 results for 
    // matchingToolId = 7 , and into new position 0 for layers 8-9 **
    console.log('RectifyDifferentColumnTotalMatch: ', this.RectifyDifferentColumnTotalMatch)
    let positionCount = 0;
    this.RectifyDifferentColumnTotalMatch.forEach(record => {
      // start by creating new match record 
      const match: IMatch = {
        position: record.position,
        matchingLayerIds: [record.layerId],
        matchingToolId: record.toolId,
        matchingToolName: record.matchingToolName
      }

      // check all other layers in any position for matching tool
      for (let lcoa = 0; lcoa < this.layerCategoryObjectArray.length; lcoa++) { // lcoa = layer categort object array
        // iterate through each tool array
        for (let p = 0; p < this.layerCategoryObjectArray[lcoa].toolArray.length; p++) { // p has no logical meaning
          const toolId = this.layerCategoryObjectArray[lcoa].toolArray[p];
          //check if tool id matches match object
          if (toolId === match.matchingToolId) {
            // check if layer id in array yet
            if (!match.matchingLayerIds.includes(this.layerCategoryObjectArray[lcoa].layerNum)) {
              //get min layer id in match.matchingLayerIds to check if next match is actually lower immediate sibling
              const currentSiblingLayerId = match.matchingLayerIds[match.matchingLayerIds.length - 1];
              if (currentSiblingLayerId - 1 === this.layerCategoryObjectArray[lcoa].layerNum) {
                // check if sybling layer also has same amount of columns, only add if true
                const currentSiblingToolTotal = this.layersToolTotal.filter(x => x.layer === currentSiblingLayerId)[0].count;
                const nextSiblingToolTotal = this.layersToolTotal.filter(x => x.layer === this.layerCategoryObjectArray[lcoa].layerNum)[0].count;
                // all good, tool ids match and sibling column total is identical
                if (currentSiblingToolTotal === nextSiblingToolTotal) {
                  match.position = positionCount
                  match.matchingLayerIds.push(this.layerCategoryObjectArray[lcoa].layerNum);
                  this.matches.push(match);
                  positionCount++
                }

              }
            }
          }
        }
      }
      // //add match to matches array
      // this.matches.push(match);
    });
    console.log('matches: ', this.matches);

    this.drawSVGs();
  }
  findIdenticalsiblings() {
    // find matching siblings
    // iterate layer arrays
    for (let i = 0; i < this.layerCategoryObjectArray.length; i++) {
      // get length of tool array
      const toolArrayLength = this.layerCategoryObjectArray[i].toolArray.length;
      // check next sibling (below) for matching tool ids
      for (let t = 0; t < toolArrayLength; t++) { // t = tool index
        try {
          // get length of sibling tool array
          const siblingToolArrayLength = this.layerCategoryObjectArray[i + 1].toolArray.length;
          for (let sibtool = 0; sibtool < siblingToolArrayLength; sibtool++) {
            // look for matching tools in sibling
            if (this.layerCategoryObjectArray[i].toolArray[t] === this.layerCategoryObjectArray[i + 1].toolArray[sibtool]) {
              // check if tool id already handled
              let alreadyHandled = false;
              if (this.matches.length > 0) {
                for (let mm = 0; mm < this.matches.length; mm++)// mm has no logical meaning
                {
                  if (this.matches[mm].matchingToolId === this.layerCategoryObjectArray[i].toolArray[t]) {
                    alreadyHandled = true;
                  }
                }
              }
              if (!alreadyHandled) {
                // add sibling match record 
                const match: IMatch = {
                  position: t,
                  matchingLayerIds: [this.layerCategoryObjectArray[i].layerNum, this.layerCategoryObjectArray[i + 1].layerNum],
                  matchingToolId: this.layerCategoryObjectArray[i + 1].toolArray[sibtool],
                  matchingToolName: this.data.filter(x => x.tool_id === this.layerCategoryObjectArray[i + 1].toolArray[sibtool])[0].tool_name
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
                        const currentSiblingLayerId = match.matchingLayerIds[match.matchingLayerIds.length - 1];
                        if (currentSiblingLayerId - 1 === this.layerCategoryObjectArray[n].layerNum) {
                          // check if sybling layer also has same amount of columns, only add if true
                          const currentSiblingToolTotal = this.layersToolTotal.filter(x => x.layer === currentSiblingLayerId)[0].count;
                          const nextSiblingToolTotal = this.layersToolTotal.filter(x => x.layer === this.layerCategoryObjectArray[n].layerNum)[0].count;

                          // all good, tool ids match and sibling column total is identical
                          if (currentSiblingToolTotal === nextSiblingToolTotal) {
                            const currentToolId = this.layerCategoryObjectArray[n].toolArray[t];

                            const nextSiblingToolId = this.layerCategoryObjectArray[n + 1] ? this.layerCategoryObjectArray[n + 1].toolArray[t] : 0;
                            console.log('checkIfToolIdsMatch: ', currentToolId === nextSiblingToolId);
                            if (currentToolId === nextSiblingToolId){}
                              match.matchingLayerIds.push(this.layerCategoryObjectArray[n].layerNum);
                          }

                          else {
                            // layer column total is different but contains same tool as previous sibling so
                            // create rectify list record and revisit after findIdenticalsiblings() complete
                            const addToRectifyList: IRectifyDifferentColumnTotalMatch = {
                              layerId: this.layerCategoryObjectArray[n].layerNum,
                              position: t,
                              toolId: toolId,
                              matchingToolName: this.data.filter(x => x.tool_id === this.layerCategoryObjectArray[i + 1].toolArray[sibtool])[0].tool_name
                            }
                            this.RectifyDifferentColumnTotalMatch.push(addToRectifyList);
                          }
                        }
                      }
                    }
                  }
                }
                //add match to matches array
                this.matches.push(match);
              }
            }
          }
        }
        catch{
        }
      }
    }
    console.log('this.layerCategoryObjectArray: ', this.layerCategoryObjectArray);
    this.recitifyLayerMatches();
  }
  createLayerArrays() {
    // create layer array descending
    this.layerArrayDesc = [...this.layerArray];
    this.layerArrayDesc.sort(function (a, b) { return b - a });
    // const categories = ['Authentication','Authorization','ILM'] ;
    const categories = ['ILM'];
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
  countToolsForEachLayer() {
    this.layerArray.forEach(layerId => {
      let count = 0;
      this.data.map(x => {
        if (x.layer_id === layerId && x.name === 'ILM') {
          count++
        }
      })
      const layerToolTotal: ILayerCount = {
        layer: layerId,
        count: count
      }
      this.layersToolTotal.push(layerToolTotal);
    });
    console.log('this.layersToolTotal: ', this.layersToolTotal);
  }

  toolNamesWidth1: IToolNameWidth[] = [
    { "displayWidth": 32, "toolId": 7, "toolName": "GTAC" }
    , { "displayWidth": 31, "toolId": 8, "toolName": "NESA" }
    , { "displayWidth": 40, "toolId": 10, "toolName": "MUAM" }
    , { "displayWidth": 173, "toolId": 9, "toolName": "Global Logon/CSP/HALO.*" }
    , { "displayWidth": 34, "toolId": 9, "toolName": "Global" }
    , { "displayWidth": 71, "toolId": 9, "toolName": "Global Logon" }
    , { "displayWidth": 126, "toolId": 9, "toolName": "Logon/CSP/HALO.*" }
    , { "displayWidth": 67, "toolId": 9, "toolName": "CSP/HALO.*" }
    , { "displayWidth": 60, "toolId": 11, "toolName": "AAF/CADI" }
    , { "displayWidth": 148, "toolId": 5, "toolName": "Access Portal/MyLogins" }
    , { "displayWidth": 36, "toolId": 5, "toolName": "Access" }
    , { "displayWidth": 34, "toolId": 5, "toolName": "Portal/" }
    , { "displayWidth": 52, "toolId": 5, "toolName": "MyLogins" }
    , { "displayWidth": 34, "toolId": 6, "toolName": "SUITS" }];

  // // utility only ised during deveopment
  // findWidthofToolNames() {
  //   const arrayOfToolNames: IHeatMapItem[] = [];
  //   this.data.map(x => {
  //     let nameWidth: IToolNameWidth
  //     if (arrayOfToolNames.length > 0) {
  //       const checkIfProcessed = arrayOfToolNames.filter(y => y.tool_id === x.tool_id)
  //       if (checkIfProcessed.length === 0) {
  //         arrayOfToolNames.push(x);
  //         nameWidth = {
  //           displayWidth: 0,
  //           toolId: x.tool_id,
  //           toolName: x.tool_name
  //         }
  //         this.toolNamesWidth.push(nameWidth)
  //       }
  //     }
  //     else{
  //       arrayOfToolNames.push(x);
  //       nameWidth = {
  //         displayWidth: 0,
  //         toolId: x.tool_id,
  //         toolName: x.tool_name
  //       }
  //       this.toolNamesWidth.push(nameWidth)
  //     }


  //   });
  //   console.log('this.toolNamesWidth: ',JSON.stringify(this.toolNamesWidth))
  //   console.log('arrayOfToolNames: ', arrayOfToolNames);
  // }
}