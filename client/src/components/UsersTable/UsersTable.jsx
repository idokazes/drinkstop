import BootstrapTable from "react-bootstrap/Table";

export function UsersTable({ headers, body }) {
  console.log("body", body);
  return (
    <BootstrapTable striped bordered hover>
      <thead>
        <tr>
          {["#", "Avatar", "Full Name", "Email", "Role", "Actions"].map(
            (header) => {
              return <th key={header}>{header}</th>;
            }
          )}
        </tr>
      </thead>
      <tbody>
        {body.map((user, index) => {
          return (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.imageUrl}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </tbody>
    </BootstrapTable>
  );
}
