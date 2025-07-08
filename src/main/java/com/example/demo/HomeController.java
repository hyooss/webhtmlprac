package com.example.demo;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

@org.springframework.stereotype.Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }
    @PostMapping("/greeting")
    public String greeting(@RequestParam("username") String username, Model model) {
        model.addAttribute("username", username);
        return "greeting";
    }
}