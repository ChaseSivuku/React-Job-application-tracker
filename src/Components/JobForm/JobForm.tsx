// import { useState } from "react";
// import type { Job } from "../../api/api";

// type Props = { 
//     defaultValues?: Partial<Job>,
//     onSubmit: (data: Job) =>  void,
//     submitLabel?: string
//     };

// export default function JobForm({defaultValues = {},  onSubmit, submitLabel = "save"}: Props){
//      const [company, setCompany] = useState(defaultValues.company ?? "")
//      const [role, setRole ] = useState(defaultValues.role ?? "")
//      const [status, setStatus ] = useState<Job["status"]>(defaultValues.status ?? "Applied")
//      const [dateApplied, setDateApplied] = useState(defaultValues.dateApplied ?? new Date().toISOString().slice(0,10));
//      const [details, setDetails] = useState(defaultValues.details ?? "");

//      const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if(!company.trim() || !role.trim()){
//             alert("Company and Role are required");
//             return;
//         }
//         onSubmit({userId: defaultValues.userId ?? 1, company, role, status, dateApplied, details});

//      };

//      return (
//     <form onSubmit={handleSubmit}>
//       {/* inputs with required attributes */}
//     </form>
//   );
// }