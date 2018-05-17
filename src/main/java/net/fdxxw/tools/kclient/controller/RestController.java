package net.fdxxw.tools.kclient.controller;

import de.taimos.httputils.HTTPResponse;
import de.taimos.httputils.WS;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://127.0.0.1:8081", maxAge = 3600)
public class RestController {


    @GetMapping("/getMetrics")
    public String getMetrics() {
        String result = "";
        try(final HTTPResponse response = WS.url("http://127.0.0.1:8080/api/v1/metricnames").get()) {
            response.getStatus(); // Get status code
            result = response.getResponseAsString(); // Get response body
        }
        return result;
    }

}
