import React from 'react';
import {Collapse, Tag, Descriptions} from 'antd';
import 'antd/dist/antd.css';

/*
 * Zendesk Ticket system subcomponent used to demonstrate each ticket
 * with detailed information as a list.
 */
function Tickets (props) {

  var Panel = Collapse.Panel;
  const tickets = props.list;

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        {tickets.map((ticket) => (
          <Panel header={ticket.subject} key={ticket.id} >
            <Descriptions bordered>
              <Descriptions.Item label="Status" span={1}>{ticket.status}</Descriptions.Item>
              <Descriptions.Item label="Priority" span={1}>{ticket.priority == null ? '\xa0' : ticket.priority}</Descriptions.Item>
              <Descriptions.Item label="Recipient" span={1}>{ticket.recipient == null ? '\xa0' : ticket.recipient}</Descriptions.Item>
              <Descriptions.Item label="Description" span={4}>{ticket.description == null ? '\xa0' : ticket.description}</Descriptions.Item>
            </Descriptions>
            <br />
            {ticket.tags.map((tag) => (<Tag>{tag}</Tag>))}
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default Tickets;