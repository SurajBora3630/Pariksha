package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.ForgotPasswordResponse;
import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    AuthService authService;


    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws Exception {
        return authService.registerUserService(user);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        return authService.loginUserService(loginRequest);
    }
    @PostMapping("/forgotPassword")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestParam String securityQuestion, @RequestParam String securityAnswer) {
        ForgotPasswordResponse response = authService.forgotPasswordService(securityQuestion, securityAnswer);
    if(response!=null){
        return new ResponseEntity<ForgotPasswordResponse>(response, null, 200);
    }
    else{
        return new ResponseEntity<ForgotPasswordResponse>(response, null, 400);
    }
    }



    @PutMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam String username,
    @RequestParam String newPassword,
    @RequestParam String confirmNewPassword) {
        try{
            boolean isPasswordReset = (boolean) authService.resetPasswordService(username, newPassword, confirmNewPassword);
            if(isPasswordReset)
            {
return new ResponseEntity<>(HttpStatus.OK);
            }
            else{
return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
}
    }
@PutMapping("/updateUser/{userId}")
    public ResponseEntity<User> updateUser( @PathVariable Long userId,
    @RequestParam String firstName,
    @RequestParam String lastName,
    @RequestParam String phoneNumber){
        try {
            User updateUser = this.authService.updateUserService(userId, firstName, lastName, phoneNumber);
            return new ResponseEntity<User>(updateUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
@GetMapping("/getUser/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId){
        try {
            User user = this.authService.getUser(userId);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
   
 

  

}
