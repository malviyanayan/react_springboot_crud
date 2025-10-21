package com.crud.springboot.springboot_backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

    @GetMapping("/hello")
    public String hello(){
        return "Jai Baba kee";
    }

    @PostMapping("/hello")
    public boolean hello(@RequestParam String name, @RequestParam String message){
        System.out.println("Someone sent you Message + --------------------------------");
        System.out.println("------ Name : " + name);
        System.out.println("------ message : " + message);
        return true;
    }
}
