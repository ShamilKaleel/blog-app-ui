export interface Dentist {
  id: string;
  userName: string;
  email: string;
  gender: "Male" | "Female";
  firstName: string;
  specialization: string;
  licenseNumber: string;
  nic: string;
  phoneNumber: string;
  roles: string[];
}

// CreateDentist type
export interface CreateDentist {
  userName: string;
  email: string;
  gender: "Male" | "Female";
  firstName: string;
  specialization: string;
  licenseNumber: string;
  nic: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateDentist {
  userName: string;
  email: string;
  gender: "Male" | "Female";
  firstName: string;
  specialization: string;
  licenseNumber: string;
  nic: string;
  phoneNumber: string;
}
