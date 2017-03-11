var app = angular.module("chatApp", []);
    app.controller("chatCtrl", function($scope,$timeout) {
        vm = this;
        //vm.from = 'nahid';
        vm.conversation = [];
        if(JSON.parse(localStorage.getItem("users")) == null){
        	var users = [];
    	}
    	else{
    		var users = JSON.parse(localStorage.getItem("users"));
    	}
        var socket = io();
        var userdata = [{
        					id: 'u0',
        					username:'System',
        					role:'system'
        				},
        				{
        					id: 'u1',
        					username:'Admin',
        					role:'admin'
        				},
        				{
        					id: 'u2',
        					username:'Site manager',
        					role:'site_manager'
        				},
        				{
        					id: 'u3',
        					username:'Engineer',
        					role:'engineer'
        				}];
        userdata = JSON.stringify(userdata);
        var userlist = JSON.parse(userdata);
        			
        var setName = function(){
        	console.log('here')
        	var name = makeid();        	
        	vm.from = name; 
        	socket.emit('chatMessage', name,  name+'Add site mgr and engineer');
        }
        setName();
        function makeid(){
        	console.log(users);
        	console.log(users.length);
	        if(users.length == 0){
	        	users.push(userlist[0]);
	        	localStorage.setItem("users", JSON.stringify(users));
			}
        	if(users.length == 1){
        		var username = users[0].username;
        		users.push(userlist[1]);
        		localStorage.setItem("users", JSON.stringify(users));
        		return username;
        	}
        	if(users.length == 2 ){
        		var username = users[1].username;
        		users.push(userlist[2]);
        		localStorage.setItem("users", JSON.stringify(users));
        		return username;
	        }
	        if(users.length == 3 ){
        		var username = users[2].username;
        		users.push(userlist[3]);
        		localStorage.setItem("users", JSON.stringify(users));
        		return username;
	        }

        }

        vm.send = function(from,message){
        	console.log(from,message);
        	if(message != '') {
        		socket.emit('chatMessage',from,message);
        	}
        }

        vm.notifyTyping = function(){
        	var user = vm.from;
        	console.log('notifyUser',user)
        	socket.emit('notifyUser',user);
        }

        socket.on('chatMessage', function(from,msg){
          	//socket.on is not belongs to angular family , thats why we have to force binding using $apply
          	var from = from;
          	$scope.$apply(function(){
              	var me = vm.from;
              	from = (from == me) ? 'Me' : from;
              	console.log(from,me);
              	var message = {
              		user : from,
              		message: msg
              	}                  
          		vm.conversation.push(message);
          		console.log(vm.conversation);
          	})
      	});

        socket.on('notifyUser', function(user){
        	var user = user;
        	console.log('user',user)
        	$scope.$apply(function(){
        		var me = vm.from;
        		console.log('me',me)
        		console.log('user',user)
        		if(user != me) {
        			console.log('here');
        			vm.typemsg = user + ' is typing ...';
        		}
        	})
        	setTimeout(function(){
        		$scope.$apply(function(){
        			vm.typemsg = '';
        		}) 
        	}, 5000);

        });
});