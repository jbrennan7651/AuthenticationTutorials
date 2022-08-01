JWT Authentication (2022)

A. Spring Boot

1. Startup: 
	1a. Dependencies
		i. JPA: 
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-data-jpa</artifactId>
			</dependency>
					
		ii. Spring Security:
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-security</artifactId>
			</dependency>
			
		iii. Spring Web:
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-web</artifactId>
			</dependency>
			
		iv. MySql Server:
			<dependency>
				<groupId>mysql</groupId>
				<artifactId>mysql-connector-java</artifactId>
				<scope>runtime</scope>
			</dependency>
			
		v. Add in Manually:
			<dependency>
				<groupId>io.jsonwebtoken</groupId>
				<artifactId>jjwt</artifactId>
				<version>0.9.1</version>
			</dependency>
			
		vi. This depency was necessary to add to allow for validation:
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-validation</artifactId>
			</dependency>
		
			
			
	1b. Application.properties
	