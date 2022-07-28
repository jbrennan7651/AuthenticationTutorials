B. Angular

1. Initialization:
	1a. In terminal: 
		npm install bootstrap jquery
	
	1b. In angular.json
		options:{
			styles:[
			**COPY THE FOLLOWING"
				"src/styles.scss",
				"node_modules/bootstrap/dist/css/bootstrap.min.css"
			],
			scripts: [
				"node_modules/jquery/dist/jquery.min.js"
			]
			
		}
		
		**this completes installation of bootstrap and jquery
	1c. app.component:
		i. .html
			remove everything and readd:
				<router-outlet><router-outlet>
	
	1d. New Components:
		i. ng g c components/home
		ii. ng g c components/admin
		iii. ng g c components/user
		iv. ng g c components/login
		v. ng g c components/header
		vi. ng g c components/forbidden
		vii. ng g s services/user
		
		
		
		
2. Building the app:
**FAIRLY STANDARD ANGUALAR SETUP. WILL NOT WASTE TIME DESCRIBING**
	2a. Header component:
		Copy the navbar from bootstrap: 
		https://getbootstrap.com/docs/5.2/components/navbar/
	
	2b. User Service:
		i. requestHeader = new HttpHeaders(
			{"No-Auth" : "True"}
		  )
		
		public login(loginData : any){
			return this.httpClient.post(`${baseUrl}/authenticate`, loginData, { headers : this.requestHeader})
		 }
		
		
		
		