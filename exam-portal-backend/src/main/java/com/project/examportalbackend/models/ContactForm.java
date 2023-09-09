package com.project.examportalbackend.models;

import lombok.Data;

@Data
public class ContactForm {
    String subject;
    String senderEmail;
    String message;
}
