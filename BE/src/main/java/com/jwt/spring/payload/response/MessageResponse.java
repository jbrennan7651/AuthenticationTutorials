package com.jwt.spring.payload.response;

public class MessageResponse {
    //
    //Data Members
    //
    private String message;

    //
    //Constructors
    //

    public MessageResponse(String message) {
        this.message = message;
    }

    //
    //Accessors
    //

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
