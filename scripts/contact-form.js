$(document).ready(function () {
    
    $("#contact-form").validate({
        
        rules:{
            
            email:{
                
                required: true,
                email: true
                
            }
            
        },
        
        messages:{
            
            email:{
                
                required: "<p>Please enter your email address</p>",
                email: "<p>Please enter a valid email address</p>"
                
            },
            
        }
        
    });

});