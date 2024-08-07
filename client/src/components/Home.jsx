import { getRepairTickets, changeStatus, claimTickets } from "../managers/RepairTicketManager";
import { useEffect, useState } from "react";

export const Home = ({ loggedInUser }) => {
  const user = loggedInUser;
  const [repairTickets, setRepairTickets] = useState([]);

  const handleGetRepairTickets = () => {
    getRepairTickets().then((tickets) => setRepairTickets(tickets));
  };

  useEffect(() => {
    handleGetRepairTickets();
  }, []);

  const handleStatusClick = (id) => {
    changeStatus(id).then(() => handleGetRepairTickets());
  };

  const handleClaimClick = (id) => {
    claimTickets(user.id, id).then(() => handleGetRepairTickets());
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Instrument</th>
          <th>Drop-off Date</th>
          <th>Pick-up Date</th>
          <th>Rushed</th>
          <th>Customer Notes</th>
          <th>Services</th>
          <th>Claimed by</th>
          <th>Total Cost</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {repairTickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.customerName}</td>
            <td>{ticket.email}</td>
            <td>{ticket.phoneNumber}</td>
            <td>{ticket.instrument}</td>
            <td>{new Date(ticket.dropOffDate).toLocaleDateString()}</td>
            <td>
              {ticket.pickupDate === null
                ? "Not picked up"
                : new Date(ticket.pickupDate).toLocaleDateString()}
            </td>
            <td>{ticket.isRushed ? "Yes" : "No"}</td>
            <td>{ticket.message}</td>
            <td>
              <ul className="list-unstyled">
                {ticket.repairTicketServices.map((repairTicketService) => (
                  <li key={repairTicketService.id}>
                    {repairTicketService.service.serviceName} - ${repairTicketService.service.cost}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              {ticket.employeeId === null ? (
                <button className="btn btn-primary" onClick={() => handleClaimClick(ticket.id)}>
                  Claim
                </button>
              ) : (
                `${ticket.employee.firstName} ${ticket.employee.lastName}`
              )}
            </td>
            <td>${ticket.totalCost}</td>
            <td>
              {ticket.isCompleted ? (
                <button className="btn btn-success" onClick={() => handleStatusClick(ticket.id)}>
                  Completed
                </button>
              ) : (
                <button className="btn btn-danger" onClick={() => handleStatusClick(ticket.id)}>
                  Incomplete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
