export const getRepairTickets = () => {
  return fetch("/api/therepairticket").then((response) => response.json());
};

export const changeStatus = (id) => {
  return fetch(`/api/therepairticket/${id}`, {
    method: "PATCH",
  });
};

export const claimTickets = (employeeId, id) => {
  return fetch(`/api/therepairticket/${employeeId}/${id}/claim`, {
    method: "PATCH",
  });
};

export const getRepairTicketsById = (id) => {
  return fetch(`/api/therepairticket/${id}`).then((response) =>
    response.json()
  );
};

export const deleteRepair = (id) => {
  return fetch(`/api/therepairticket/${id}`, {
    method: "DELETE",
  });
};

export const postNewRepair = (repairObj) => {
  return fetch("/api/therepairticket", {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repairObj)
  })
}

export const getRepairByIdForEdit = (id) => {
  return fetch(`/api/TheRepairTicket/repairTicket/${id}`).then((response) => response.json())
}

export const editRepair = (id, repairObj) => {
  return fetch(`/api/therepairticket/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repairObj)
  })
}
