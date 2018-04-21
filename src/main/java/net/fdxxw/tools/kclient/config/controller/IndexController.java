package net.fdxxw.tools.kclient.config.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * created by fdxxw on 2018/04/21
 */
@Controller
public class IndexController {

    @GetMapping(value = "/")
    public String index() {
        return "index";
    }
}
