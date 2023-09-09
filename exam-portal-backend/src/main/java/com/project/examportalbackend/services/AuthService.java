package com.project.examportalbackend.services;


import java.io.IOException;

import com.project.examportalbackend.models.ForgotPasswordResponse;
import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.User;

public interface AuthService {
    User registerUserService(User user) throws Exception;

    LoginResponse loginUserService(LoginRequest loginRequest) throws Exception;

    ForgotPasswordResponse forgotPasswordService(String securityQuestion, String securityAnswer);

    //Object resetPasswordService(String oldPassword, String newPassword, String confirmNewPassword, String confirmNewPassword2);

   boolean resetPasswordService(String username, String newPassword, String confirmNewPassword);

User updateUserService(Long userId,String firstName, String lastName,
        String phoneNumber) throws IOException;

User getUser(Long userId);



   
}
