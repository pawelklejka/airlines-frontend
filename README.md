# airlines-frontend - MASTER THESIS PROJECT

### To run application:
```docker
docker run -p 8085:80 pawelklejka/airlines-frontend
```


#### 1. Search flight dependently on starting destination
![start](https://user-images.githubusercontent.com/24233415/192457474-2efa69ba-2c90-4905-97b8-70b45afd201b.png)
#### 2. Buy ticket
![buyticket](https://user-images.githubusercontent.com/24233415/192457561-f4ffbf20-3f18-4467-bd29-3ec5fd6c719e.png)
#### 3. After you buy ticket the backend generates PDF by propagating data from models that are in servlet context to template and after that "simultaneously" the ticket is downloadable and sent to tourist mail.
![biletpdf](https://user-images.githubusercontent.com/24233415/192457610-febf73f5-da6e-4021-9579-2089992b2790.png)
#### 4. You have independent tabs responsible for showing all tourists and flights
![tourists](https://user-images.githubusercontent.com/24233415/192457509-5ee90a77-0430-47cc-83de-51005b94a3b8.png)
![flights](https://user-images.githubusercontent.com/24233415/192457519-72c13ec1-ffd0-4b52-ba81-630509bf3814.png)
#### 5. There are independent tabs for adding tourists and flights to database
![addtourist](https://user-images.githubusercontent.com/24233415/192457551-7ea51c79-70bb-4d7c-9e21-614c560ebf56.png)
#### 6. Switch Endpoints button changes endpoints from Monolith Endpoints adressess to Microservices Endpoints adresses and vice versa
