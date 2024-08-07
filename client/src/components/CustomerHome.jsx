import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getRepairTicketsById,
  deleteRepair,
} from "../managers/RepairTicketManager";
import { useNavigate } from 'react-router-dom';

export const CustomerHome = () => {
  const { userId } = useParams();

  const navigate = useNavigate()

  const [repairTickets, setRepairTickets] = useState([]);

  const handleGetRepairTicketsById = () => {
    getRepairTicketsById(userId).then(setRepairTickets);
  };

  useEffect(() => {
    handleGetRepairTicketsById();
  }, []);

  const handleDelete = (id) => {
    deleteRepair(id).then(() => handleGetRepairTicketsById());
  };


  

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Instrument</th>
          <th>Drop-off Date</th>
          <th>Pick-up Date</th>
          <th>Rushed</th>
          <th>Customer Notes</th>
          <th>Services</th>
          <th>Repaired by</th>
          <th>Total Cost</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {repairTickets.map((repairTicket) => (
          <tr key={repairTicket.id}>
            <td>{repairTicket.instrument}</td>
            <td>{new Date(repairTicket.dropOffDate).toLocaleDateString()}</td>
            <td>
              {repairTicket.pickupDate === null
                ? ""
                : new Date(repairTicket.pickupDate).toLocaleDateString()}
            </td>
            <td>{repairTicket.isRushed ? "Yes" : "No"}</td>
            <td>{repairTicket.message}</td>
            <td>
              <ul className="list-unstyled">
                {repairTicket.repairTicketServices.map(
                  (repairTicketService) => (
                    <li key={repairTicketService.id}>
                      {repairTicketService.service.serviceName} - $
                      {repairTicketService.service.cost}
                    </li>
                  )
                )}
              </ul>
            </td>
            <td>
              {repairTicket?.employee?.firstName}{" "}
              {repairTicket?.employee?.lastName}
            </td>
            <td>${repairTicket.totalCost}</td>
            <td>{repairTicket.isCompleted ? "Ready to Pickup" : "In Progress"}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(repairTicket.id)}>
                Cancel
              </button>
              <button className="btn btn-primary ms-2"  onClick={() => navigate(`/editrepair/${repairTicket.id}`)}>Make Changes</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
