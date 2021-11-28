import { useState, useEffect } from 'react'
import './App.css'
import {Layout, Pagination, Skeleton} from 'antd';
import Tickets from './component/Ticket'

const {Header, Content} = Layout;

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [ticketsList, setTicketsList] = useState([])
  const [totalPageNum, setTotalPageNum] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      const totalPageNum = await fetchNum()
      setTotalPageNum(Math.ceil(totalPageNum / 25))
      console.log(totalPageNum)

      const tickets = await fetchTickets(currentPage);
      setTicketsList(tickets)
      setLoading(false)
    }

    fetchAll()
  }, [])

  //Fetch ticket num
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

  //Fetch tickets based on page num
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

  const changePage = async (page) => {
    const tickets = await fetchTickets(page);
    setTicketsList(tickets)
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
