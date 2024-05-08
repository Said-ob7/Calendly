package ma.emsi.calendly_backend.Controller;

import jdk.jfr.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.emsi.calendly_backend.entities.Events;
import ma.emsi.calendly_backend.services.GoogleCalendarService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CalendarController {

    private final GoogleCalendarService googleCalendarService;

    @Autowired
    public CalendarController(GoogleCalendarService googleCalendarService) {
        this.googleCalendarService = googleCalendarService;
    }


    @PostMapping("/events")
    public ResponseEntity<String> createEvent(@RequestBody Events event,
                                              @RequestParam("accessToken") String accessToken,
                                              @RequestParam("calendarId") String calendarId) {
        try {
            System.out.println("Event Created");
            googleCalendarService.createCalendarEvent(accessToken, calendarId, event);
            return ResponseEntity.ok("Event created successfully.");
        } catch (Exception e) {
            System.out.println("Failed");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create event. Error: " + e.getMessage());
        }
    }
}
