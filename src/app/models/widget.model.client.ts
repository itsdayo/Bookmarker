export class Widget {
id?: string ='';
widgetType: string='';
pageId: string='';
size?: number=1;
text?: string='';
width?: string='';
url?: string='';
name?: string='';
placeholder?: string='';
rows?: number=1;
formatted?: boolean=false;

constructor(id:string,widgetType:string, pageId:string){
	this.id = id;
	this.widgetType = widgetType;
	this.pageId = pageId;
		
} 
} 