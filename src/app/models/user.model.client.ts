export class User {
id?: string;
username: string;
password: string;
firstName: string;
lastName: string;
email: string;

constructor(id:string,username:string, password:string, firstName:string, lastName:string, email:string){
	this.id = id;
	this.username = username;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
} 
} 