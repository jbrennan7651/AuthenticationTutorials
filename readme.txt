JWT Tutorial

Based on: https://www.youtube.com/watch?v=VZjs6-_yccw&list=PLZTETldyguF2bRz-ypCa3a8gumxeXB4pu&index=2


A. Springboot

1. Dependencies:
	these are the dependencies added at the beginning of the tutorial
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-jdbc</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		
2. Application.properties	
	server.port = 9090;
	spring.datasource.url=jdbc:mysql://localhost:3306/jwt_tutorial
	spring.datasource.username=root
	spring.datasource.password=root
	spring.datasource.platform=mysql
	//automatically creates tables from entities
	spring.jpa.hibernate.ddl-auto=create
	
	2a. MySQL information:
		i. Check port number with: 
			show global variables like 'port';
		ii. Check that tabels are created properly with: 
			desc table;
	
3. Constructed Springboot framework for project:
3*. Below the framework is the order of construction, the entities are created in their 
numerical order as well. Check code for additional information.
	packages:
		a. controller 
		b. dao
		c. entity
		d. service
	
	3a. Controller Package
		i. RoleController
			@RestController
			@PostMapping({"/createNewRole"})
		
		ii. UserController
			@RestController
			@PostMapping({"/registerNewUser"})
			@PostConstruct //automatically loads this method when code runs sits above //initRolesAndUser method
			@GetMapping({"/forAdmin"})
			@GetMapping({"/forUser")}
			
	3b. DAO Package
		i. RoleDao extends CrudRepository
			@Repository
			
		ii. UserDao
			@Repository
			
	3c. Entity Package
		i. Role 
			@Entity
			@Id = roleName
			
		ii. User
			@Entity
			@ManytoMany (initializes relationship between tables)
			@JoinTable (sets the name for the relationship table)
				@JoinColumns (creates relations between columns on sql tables)
	
	3d. Service Package
		i. RoleService
			@Service
			
		ii. UserService
			@Service
			
3x.i. Create Role entity first and test functionality 
3x.ii. Create User entity and check functionality:
	a. User class will throw an error:
		"Error executing DDL "alter table user_role drop foreign key FK859n2jvi8ivhui0rl0esws6o" via JDBC Statement"
		-this can be ignored for
		
	b. When you run a new class, the mysql tables will clear themselves 
		(this is related to the above error in 3.ii.a). 
		To avoid this: 
		
		i. you can change the tag in application.properties:
		spring.jpa.hibernate.ddl-auto=<INSERT TAG> (create, delete, update, etc)
		
		ii. you can create the table data in the code itself:
			For Example: RoleService.java -> 
			public void initRolesAndUser(){
				Role adminRole = new Role();
				adminRole.setRoleName("Admin");
				adminRole.setRoleDescription("Admin role");
				roleDao.save(adminRole);
				
				User adminUser = new User();
				adminUser.setUserFirstName("admin");
				adminUser.setUserLastName("admin");
				adminUser.setUserName("admin123");
				adminUser.setUserPassword("adminP@55");
				Set<Role> adminRoles = new HashSet<>();
				adminRoles.add(adminRole);
				adminUser.setRole(adminRoles);
				userDao.save(adminUser);
				
				//Other entries
			}
			
			The roles seen here are defined in the user class (see code for more details).
			
			Once the roles are set, and the tables are queriable in PostMan using the mapping provided, we can begin setting up security and authorization (S4).

4. Security and Authorization 

	4a. Dependencies:
			//The spring security dependency requires restarting the IDE sometimes
			//If it is red, restart, this should fix it.
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-security</artifactId>
			</dependency>

			<dependency>
				<groupId>io.jsonwebtoken</groupId>
				<artifactId>jjwt</artifactId>
				<version>0.9.1</version>
			</dependency>
			
	//ensure that you check compatibility and use the most stable up to date version of //these dependencies. 
	
	After you've inserted these two dependecies	into the pom.xml file, rerun the program to ensure compatibility.
	
	4b. Configuration package:
		i. CorsConfiguration
			@Configuration
			**Ensure you select the correct WebMvcConfigurer:
			 new WebMvcConfigurer -> addCorsMapping(registry: CorsRegistry): void
		
		ii. JwtAuthenticationEntryPoint
			@Component
			//If the AuthenticationEntryPoint implementaion cannot be found, restart the //IDE, or try to manually enter the import ->
			//import org.springframework.security.web.AuthenticationEntryPoint;
			
		iii. WebSecurityConfiguration extends WebSecurityConfigurerAdapter //depreciated
			@Configuration
			@EnableWebSecurity
			@EnableGlobalMethodSecurity(prePostEnabled = true)
				
		iv. JwtRequestFilter
			@Component
	
	4c. Service package:
		i. JwtService 
			@Service
			
	4d. Util package
		i. JwtUtil
			@Component
			//ensure you get the correct imports ->
			//import io.jsonwebtoken.Claims;
			//import io.jsonwebtoken.Jwts;
			//import org.springframework.stereotype.Component;
			//import java.util.function.Function;
			
			//initially, in this object:
			//UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =  new UsernamePasswordAuthenticationToken(userDetails,
                        null,
                        userDetails.getAuthorities());
			//use null because there are not any credentials to pass at this point. 
			
	4e. Controller package:
		i. JwtController
			@RestController
			@CrossOrigin
			@PostMapping({"/authenticate"})
		
		
	4f. Entity package: 
		i. JwtRequest
		ii. JwtResponse
		
	4g. Potential Errors and Exceptions: 
		i. Circular dependecies:
			a. Solutions:
				i. add to application.properties: 			spring.main.allow-circular-references=true
				
				**This is not the best solution**
				
				ii.
		
		ii. Error creating bean with name 'springSecurityFilterChain' defined in class 	path resource
			a. Solutions:
				i. add path "/authenticate" to WebSecurityConfiguration -> configure() ->
					httpSecurity.csrf().disable()
					.authorizeRequests().antMatchers("add pathing here")
					
					**OR COPY THE FOLLOWING: 
					httpSecurity.csrf().disable()
						.authorizeRequests().antMatchers("/authenticate").permitAll()
						.antMatchers(HttpHeaders.ALLOW).permitAll()
						.anyRequest().authenticated()
						.and()
						.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
						.and()
						.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

5. Testing and Debugging:

	5a. MySQL:
		i. User table should include userName and encoded password
	
	5b. PostMan:
		i. check "/authenticate" POST request: 
			{
				"userName" : "admin",
				"userPassword" : "admin@pass"
			}
			
			**THIS SHOULD RETURN ALL USER INFORMATION**
			{
				"user": {
					"userName": "james123",
					"userFirstName": "james",
					"userLastName": "brennan",
					"userPassword": "$2a$10$W4SD16OtJTq5kUWbOGIQ7.ljEIjUpwz5nyiJrn0LEgPskP10KxOEu",
					"role": [
						{
							"roleName": "User",
							"roleDescription": "Default role for newly created record"
						}
					]
				},
				"jwtToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lczEyMyIsImV4cCI6MTY1ODgyNDMyOSwiaWF0IjoxNjU4ODA2MzI5fQ.KDi5EvLu0z9iCQahEGe2_jJxha7IdV3vTg6fe0rAhzyKbfcJbdKsOaZHmCLzGtrtiPCCJ7JpAlvBmhO77aHNkA"
			}
			
			
		ii. Check Authorization:
			a. in Authorization tab -> select type = Bearer
			b. paste token into Token field
			c. check path : localhost:9090/forUser or localhost:9090/forAdmin
			d. Ensure GET and send request. 
			e. notice that both paths return a positive authorization:
				in UserController class, above forAdmin method paste:
				@PreAuthorize("hasRole('Admin')")
				
				above forUser method paste: 
				@PreAuthorize("hasRole('User')")
				
				**NOW YOU SHOULD ONLY BE ABLE TO ACCESS USERS AS A /FORUSER ROLE HOLDER AND /FORADMIN AS AN ADMIN ROLE HOLDER. USING THE WRONG KEY SHOULD RESULT IN A 403 FORBIDDEN STATUS**
	
	**If you've made it this far without any errors, we can now remove the hard-coded aspects**
	
6. Polishing and Finishing: 
	6a. UserService: 
	//Add this code to the registerNewUser method:
	 public User registerNewUser(User user){
        Role role = roleDao.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }
	
	//At this point you may also comment out the hard-coded user entry. 
	//It is a good idea to keep the admin, as you do not want to allow any user
	//to register as an admin
	
	**UPON TESTING IN POSTMAN, REGISTERING WILL YIELD A 401 UNAUTHORIZED CODE. ADJUST PATHING SIMILAR TO 4g.ii.a.i: pathing should be: "/authenticate","/registerNewUser" **
	
	Notes: If you want to grant authorization to multiple roles in the @PreAuthorize decorator hasAnyRole will allow you to grant perms. 

B. Angular