package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.configurations.JwtUtil;
import com.project.examportalbackend.models.ForgotPasswordResponse;
import com.project.examportalbackend.models.LoginRequest;
import com.project.examportalbackend.models.LoginResponse;
import com.project.examportalbackend.models.Role;
import com.project.examportalbackend.models.User;
import com.project.examportalbackend.repository.RoleRepository;
import com.project.examportalbackend.repository.UserRepository;
import com.project.examportalbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User registerUserService(User user) throws Exception {
        
        User temp = userRepository.findByUsername(user.getUsername());
        if (temp != null) {
            throw new Exception("User Already Exists");
        } else {
            User newUser = new User();
            Role role = roleRepository.findById("USER").isPresent() ? roleRepository.findById("USER").get() : null;
            Set<Role> userRoles = new HashSet<>();
            userRoles.add(role);
            newUser.setRoles(userRoles);
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setUsername(user.getUsername());
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            newUser.setPhoneNumber(user.getPhoneNumber());
            newUser.setSecurityAnswer(user.getSecurityAnswer().toLowerCase().trim());
            newUser.setSecurityQuestion(user.getSecurityQuestion());
            User userToReturn= userRepository.save(newUser);
            return userToReturn;
        }
    }

    public LoginResponse loginUserService(LoginRequest loginRequest) throws Exception {

        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(loginRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        return new LoginResponse(userRepository.findByUsername(loginRequest.getUsername()), token);
    }

   

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @Override
    public ForgotPasswordResponse forgotPasswordService(String securityQuestion, String securityAnswer) {
      
ForgotPasswordResponse forgotPasswordResponse=new ForgotPasswordResponse();
        User user = userRepository.findBySecurityQuestionAndSecurityAnswer(securityQuestion, securityAnswer);
        if (user != null) {
            forgotPasswordResponse.setUsername(user.getUsername());
            forgotPasswordResponse.setPassword(user.getPassword());
            return forgotPasswordResponse;
        } else {
            return null;
        }

    }

    @Override
    public boolean resetPasswordService(String username, String newPassword, String confirmNewPassword) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            if (newPassword.equals(confirmNewPassword)) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public User updateUserService(Long userId,String firstName, String lastName, String phoneNumber) throws IOException {
        User user = userRepository.findById(userId).get();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhoneNumber(phoneNumber);
        User updatedUser = userRepository.save(user);
        return updatedUser;
    }

    @Override
    public User getUser(Long userId) {
        
            User user = userRepository.findById(userId).get();

      if(user!=null){
        // print
        System.out.println("user is "+user);
          return user;
      }
      else{ 
     System.out.println("user is null");
          return null;
      }
    }



    

    
}
