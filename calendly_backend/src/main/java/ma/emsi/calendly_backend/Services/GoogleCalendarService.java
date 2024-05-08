package ma.emsi.calendly_backend.services;

import jdk.jfr.Event;
import ma.emsi.calendly_backend.entities.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.net.URI;

@Component
public class GoogleCalendarService {

    private final String GOOGLE_CALENDAR_API_BASE_URL = "https://www.googleapis.com/calendar/v3";

    private final RestTemplate restTemplate;

    @Autowired
    public GoogleCalendarService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void createCalendarEvent(String accessToken, String calendarId, Events event) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.set("Content-Type", "application/json");

        HttpEntity<Events> requestEntity = new HttpEntity<>(event, headers);

        URI uri = URI.create(GOOGLE_CALENDAR_API_BASE_URL + "/calendars/" + calendarId + "/events");

        ResponseEntity<Void> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, Void.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            // Event created successfully
            System.out.println("Event created successfully.");
        } else {
            // Handle error
            System.err.println("Failed to create event. Error: " + response.getStatusCode());
        }
    }
}