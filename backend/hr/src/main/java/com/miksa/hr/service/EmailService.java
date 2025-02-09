package com.miksa.hr.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Component
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private static final String FROM_EMAIL = "conectar.utn@gmail.com";
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine springTemplateEngine;

    public void send(String template, Context context, String[] to, String subject) {

        String processedTemplate = springTemplateEngine.process(template, context);
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
                    mimeMessage,
                    MimeMessageHelper.MULTIPART_MODE_MIXED,
                    StandardCharsets.UTF_8.name()
            );

            mimeMessageHelper.setFrom(FROM_EMAIL);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(processedTemplate, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException | MailException e) {
            log.error("email_exception", e);
        }
    }

}
