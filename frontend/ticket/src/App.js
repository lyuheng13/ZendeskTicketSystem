import { useState, useEffect } from 'react';
import './App.css';
import {Layout, Pagination, Skeleton} from 'antd';
import Tickets from './component/Ticket';

const {Header, Content} = Layout;

/*
 * The Zendesk Ticket System main app, fetching and demonstrating
 * a list of tickets from Zendesk Ticket System backend.
 */
function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsList, setTicketsList] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [loading, setLoading] = useState(true);

  /*
   * Default data setting
   */
  useEffect(() => {
    const fetchAll = async () => {
      const totalPageNum = await fetchNum();
      setTotalPageNum(Math.ceil(totalPageNum / 25));
      console.log(totalPageNum);

      const tickets = await fetchTickets(currentPage);
      setTicketsList(tickets);
      setLoading(false);
    }

    fetchAll()
  }, [])

  /*
   * Fetch the total ticket number from the backend to caculate
   * the total page number that need to be shown.
   */
  const fetchNum = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3001/tickets/count");
      const dataText = await res.text();
      const obj = await JSON.parse(dataText);
      return obj.count.value;
    } catch(error) {
      console.log(error);
    }
  }

  /*
   * Fetch the tickets based on the current page number.
   * Maximun of 25 of items will be fetched.
   */
  const fetchTickets = async (currentPage) => {
    try {
      const res = await fetch("http://127.0.0.1:3001/tickets/" + currentPage);
      const dataText = await res.text();
      const obj = await JSON.parse(dataText);
      return obj;
    } catch (err) {
      console.log(err);
    }
  }

  /*
   * Change Page function used when another page is clicked by user.
   * Refetch the tickets based on the clicked page num.
   */
  const changePage = async (page) => {
    const tickets = await fetchTickets(page);
    setCurrentPage(page);
    setTicketsList(tickets);
  }

    return (
      <Layout style={{padding: '50px 100px 100px 100px'}}>
          <Header>
            <header className="Ticket"></header>
            <h1 style={{color: 'white'}}>Zendesk Ticket System</h1>
          </Header>
          <Content>
            <Skeleton active loading={loading}>
              <Tickets list={ticketsList}/>
              <Pagination simple defaultCurrent={1} total={totalPageNum * 10} onChange={changePage}/>
            </Skeleton>
          </Content>
      </Layout>
    )
}

export default App;
