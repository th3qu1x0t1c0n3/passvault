package quixotic.personnal.passvault.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import quixotic.personnal.passvault.exception.APIException;
import quixotic.personnal.passvault.exception.ErrorResponce;

import java.sql.SQLException;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionControllerAdvice {

    private final HttpServletRequest request;

    @ExceptionHandler(APIException.class)
    public ResponseEntity<ErrorResponce> handleAPIException(APIException ex) {
        ErrorResponce response = ErrorResponce.builder()
                .timestamp(LocalDateTime.now().toString())
                .status(ex.getStatus().value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(ex.getStatus()).body(response);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ErrorResponce> handleSQLException(SQLException ex) {
        ErrorResponce response = ErrorResponce.builder()
                .timestamp(LocalDateTime.now().toString())
                .status(611)
                .message("SQL Exception")
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponce> handleOtherException(Exception ex) {
        ErrorResponce response = ErrorResponce.builder()
                .timestamp(LocalDateTime.now().toString())
                .status(611)
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(response);
    }

}
