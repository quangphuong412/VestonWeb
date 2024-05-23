import TableBranch from './TableBranch';
import BranchSearchForm from './BranchSearchForm';
import BranchDetailForm from './BranchDetailForm';

export default function Branches() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <BranchSearchForm />
        <TableBranch />
      </div>
      <BranchDetailForm />
    </>
    //   <>
    //   <div className="space-y-4 rounded-lg w-full">
    //     <EmployeeSearchForm />
    //     <TableEmployee />
    //   </div>

    //   <EmployeeDetailForm />
    // </>
  );
}
