# Zendesk Ticket System Backend APIs

## GET /tickets/count
This endpoint allows you to request the number of total tickets stored in the Zendesk Cloud.
<br>
<br>

### Sample Input
+ curl http://{your host}:3001/tickets/count
<br>
<br>

### Sample Output

```json
{
  "count": {
        "value": 101,
        "refreshed_at": "2021-11-28T20:26:17+00:00"
    }
}

```

------
## GET /tickets/:pagenum
This endpoint allows to request a list of tickets information (maximum of 25) as an array of JSON object.
<br>
<br>

### Sample Input
+ curl http://{your host}:3001/tickets/1
<br>
<br>

### Sample Output
```json
[
    {
        "url": "https://zcclance.zendesk.com/api/v2/tickets/1.json",
        "id": 1,
        "external_id": null,
        "via": {
            "channel": "sample_ticket",
            "source": {
                "from": {},
                "to": {},
                "rel": null
            }
        },
        "created_at": "2021-11-25T21:39:56Z",
        "updated_at": "2021-11-25T21:39:56Z",
        "type": "incident",
        "subject": "Sample ticket: Meet the ticket",
        "raw_subject": "Sample ticket: Meet the ticket",
        "description": "Hi there,\n\nI’m sending an email because I’m having a problem setting up your new product. Can you help me troubleshoot?\n\nThanks,\n The Customer\n\n",
        "priority": "normal",
        "status": "open",
        "recipient": null,
        "requester_id": 1267119971310,
        "submitter_id": 1902325957844,
        "assignee_id": 1902325957844,
        "organization_id": null,
        "group_id": 4411195997339,
        "collaborator_ids": [],
        "follower_ids": [],
        "email_cc_ids": [],
        "forum_topic_id": null,
        "problem_id": null,
        "has_incidents": false,
        "is_public": true,
        "due_at": null,
        "tags": [
            "sample",
            "support",
            "zendesk"
        ],
        "custom_fields": [],
        "satisfaction_rating": null,
        "sharing_agreement_ids": [],
        "fields": [],
        "followup_ids": [],
        "ticket_form_id": 1260815123550,
        "brand_id": 1260803289950,
        "allow_channelback": false,
        "allow_attachments": true
    },
    ...
]
```