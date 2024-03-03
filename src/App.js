import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// import layout
import MainLayout from "./layout/MainLayout";
import SidebarLayout from "./layout/SidebarLayout";

// import pages
import LoginPage from "./page/LoginPage";
// import component
import NotFound from "./component/NotFound";
import ErrorPage from "./component/ErrorPage";
import RequireAuth from "./component/RequireAuth";
import UnauthorizeError from "./component/UnauthorizeError";

// import utils
import { AuthProvider } from "./utils/AuthProvider";
// import useFetchPrivate from "./utils/useFetchPrivate";
import ROLES_LIST from "./utils/rolesList";
// import usePermission from "./utils/usePermission";
import ManagementPage from "./page/Nursepage/ManagementPage";
import MedicalRecordByPatient, {
  LoadMedicalRecordByPatient,
} from "./page/Nursepage/MedicalRecordByPatientPage";
import ViewMedicalRecordPage, {
  LoadgetViewMedicalRecord,
} from "./page/Nursepage/ViewMedicalRecordPage";
import HistorymedicalPage from "./page/Nursepage/HistorymedicalPage";
import Editmedicalreacord, {
  updateAction,
} from "./page/Nursepage/EditmedicalrecordPage";
import HomePage from "./page/HomePage";
import UserPage from "./page/Adminpage/UserPage";
import SecretPage from "./page/SecretPage";
import AddpatientPage from "./page/Nursepage/AddpatientPage";
import PatientPage from "./page/Adminpage/PatientPage";
import UpdatePatientPage, {
  ActionPatient,
} from "./page/Adminpage/UpdatePatientPage";
import DiagnosisPage from "./page/Adminpage/DiagnosisPage";
import UpdateDiagnosisPage, {
  ActionDiagnosis,
} from "./page/Adminpage/UpdateDiagnosisPage";
import AddDianosisPage from "./page/Adminpage/AddDianosisPage";
import NursingActivitiesPage from "./page/Adminpage/NursingActivitiesPage";
import AddNursingActivitiesPage from "./page/Adminpage/AddNursingActivitiesPage";
import UpdateNursingActivities, {
  Actionactivities,
} from "./page/Adminpage/UpdateNursingActivitiesPage";
import MedicationsPage from "./page/Adminpage/MedicationsPage";
import DetailsMedicalPage, {
  LoadgetDetailmedication,
} from "./page/Adminpage/DetailsMedicalPage";
import UpdateMedicalPage, {
  ActionMedication,
} from "./page/Adminpage/UpdateMedicalPage";
import AddmedicationPage from "./page/Adminpage/AddmedicationPage";
import MedicalSuppliesPage from "./page/Adminpage/MedicalSuppliesPage";
import DetailsMedicalPageSupplies, {
  LoadgetDetailmedicalSupplies,
} from "./page/Adminpage/DetailMedicalSuppliesPage";
import AddMedicalSuppliesPage from "./page/Adminpage/AddMedicalSuppliesPage";
import RegisterForm from "./page/Adminpage/RegisterPage";
import UpdateMedicalSupplies, {
  ActionMedicationSupplies,
} from "./page/Adminpage/UpdateMedicalSuppliesPage";
import SearchPatientPage from "./page/Nursepage/SearchPatientPage";
import ProfilepatientPage, {
  LoadGeneralByPatient,
} from "./page/Nursepage/ProfilepatientPage";
import GeneralInfoForm from "./page/FormPage/GeneralInfoForm";
import LayoutBarchart from "./layout/LayoutBarchart";
import BarChartdiagnosis from "./page/Adminpage/Barchart/BarChartdiagosisPage";
import BarChartNusingactivities from "./page/Adminpage/Barchart/BarChartnursingactivities";
import BarChartorganizations from "./page/Adminpage/Barchart/BarChartorganizations";
import NewmedicalRecord from "./page/Nursepage/NewmedicalRecordPage";
import BarChartmedication from "./page/Adminpage/Barchart/BarChartmedication";
import SearchPatientPagePsy from "./page/Psychologistpage/SearchPsy";
// import Generaldata from "./page/Psychologistpage/Generaldatapage";
import NewCounselingRecord from "./page/Psychologistpage/Newcounselingpage";
import CounselingByPateint, {
  LoadCounselingbyPatient,
} from "./page/Psychologistpage/CounselingByPatietnpage";
import Appointment from "./page/Psychologistpage/Appointmentpage";
import Log from "./page/AddpatintByStd";
// import Abc from "./page/Adminpage/Barchart/abc";
import BarChartmedicationSup from "./page/Adminpage/Barchart/BarChartmedicalSup";
import ViewCounselingById, {
  LoadgetViewCounseling,
} from "./page/Psychologistpage/DetailHistorypage";

function RouterApp() {
  // const fetchPrivate = useFetchPrivate();
  // const { hasPermission } = usePermission();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SidebarLayout />} errorElement={<NotFound />}>
        {/* <Route path="table" element={<Component />} /> */}
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES_LIST.Nurse]} />}
          errorElement={<NotFound />}
        >
          <Route path="search" element={<MainLayout />}>
            <Route index element={<SearchPatientPage />} />
            <Route path=":id/general">
              <Route
                index
                element={<ProfilepatientPage />}
                loader={LoadGeneralByPatient}
              />
              <Route path="add" element={<GeneralInfoForm />} />
            </Route>
            <Route path=":id" element={<NewmedicalRecord />} />
            <Route path=":id/history">
              <Route
                index
                element={<MedicalRecordByPatient />}
                loader={LoadMedicalRecordByPatient}
              />
              <Route
                path=":id/view"
                element={<ViewMedicalRecordPage />}
                loader={LoadgetViewMedicalRecord}
              />
            </Route>
          </Route>

          <Route path="manage/page/:page" element={<MainLayout />}>
            <Route index element={<ManagementPage />} />
            <Route path=":id/general">
              <Route
                index
                element={<ProfilepatientPage />}
                loader={LoadGeneralByPatient}
              />
              <Route path="add" element={<GeneralInfoForm />} />
            </Route>

            <Route path=":id" element={<NewmedicalRecord />} />
            <Route path=":id/history">
              <Route
                index
                element={<MedicalRecordByPatient />}
                loader={LoadMedicalRecordByPatient}
              />
              <Route
                path=":id/view"
                element={<ViewMedicalRecordPage />}
                loader={LoadgetViewMedicalRecord}
              />
            </Route>
          </Route>
          <Route path="record/page/:page" element={<MainLayout />}>
            <Route index element={<HistorymedicalPage />} />
            <Route
              path=":id/edit"
              element={<Editmedicalreacord />}
              action={updateAction}
              errorElement={<ErrorPage />}
            />
          </Route>
          <Route path="addpatient" element={<MainLayout />}>
            <Route index element={<AddpatientPage />} />
          </Route>
        </Route>
        <Route path="unauthorize" element={<UnauthorizeError />} />
        {/* [...Object.values(ROLES_LIST)] */}
        <Route
          element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]} />}
          errorElement={<NotFound />}
        >
          <Route path="users" element={<MainLayout />}>
            <Route index element={<UserPage />} />
            <Route path="adduser" element={<RegisterForm />} />
          </Route>

          <Route path="patient/page/:page" element={<MainLayout />}>
            <Route index element={<PatientPage />} />
            <Route
              path=":id"
              element={<UpdatePatientPage />}
              action={ActionPatient}
            />
            <Route path=":id/general">
              <Route
                index
                element={<ProfilepatientPage />}
                loader={LoadGeneralByPatient}
              />
              <Route path="add" element={<GeneralInfoForm />} />
            </Route>
          </Route>

          <Route path="disease" element={<MainLayout />}>
            <Route index element={<DiagnosisPage />} />
            <Route
              path=":id/edit"
              element={<UpdateDiagnosisPage />}
              action={ActionDiagnosis}
            />
            <Route path="add" element={<AddDianosisPage />} />
          </Route>

          <Route path="activities" element={<MainLayout />}>
            <Route index element={<NursingActivitiesPage />} />
            <Route
              path=":id/edit"
              element={<UpdateNursingActivities />}
              action={Actionactivities}
            />
            <Route path="add" element={<AddNursingActivitiesPage />} />
          </Route>

          <Route path="medication" element={<MainLayout />}>
            <Route index element={<MedicationsPage />} />
            <Route path=":id">
              <Route
                index
                element={<DetailsMedicalPage />}
                loader={LoadgetDetailmedication}
              />
              <Route
                path="edit"
                element={<UpdateMedicalPage />}
                action={ActionMedication}
              />
            </Route>
            <Route path="add" element={<AddmedicationPage />} />
          </Route>

          <Route path="medicalsupplies" element={<MainLayout />}>
            <Route index element={<MedicalSuppliesPage />} />
            <Route path=":id">
              <Route
                index
                element={<DetailsMedicalPageSupplies />}
                loader={LoadgetDetailmedicalSupplies}
              />
              <Route
                path="edit"
                element={<UpdateMedicalSupplies />}
                action={ActionMedicationSupplies}
              />
            </Route>
            <Route path="add" element={<AddMedicalSuppliesPage />} />
          </Route>

          <Route path="datareport" element={<LayoutBarchart />}>
            <Route index element={<BarChartdiagnosis />} />
            <Route
              path="reportnurigactivites"
              element={<BarChartNusingactivities />}
            />
            <Route
              path="reportorganizations"
              element={<BarChartorganizations />}
            />
            <Route path="reportmedications" element={<BarChartmedication />} />
            <Route
              path="reportmedicationsupplies"
              element={<BarChartmedicationSup />}
            />
          </Route>
          <Route path="secret" element={<SecretPage />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES_LIST.Psychologist]} />}
          errorElement={<NotFound />}
        >
          <Route path="searchpatient" element={<MainLayout />}>
            <Route index element={<SearchPatientPagePsy />} />
            <Route path=":id" element={<NewCounselingRecord />} />
            <Route path=":id/general">
              <Route
                index
                element={<ProfilepatientPage />}
                loader={LoadGeneralByPatient}
              />
              <Route path="add" element={<GeneralInfoForm />} />
            </Route>
            <Route path=":id/historys">
              <Route
                index
                element={<CounselingByPateint />}
                loader={LoadCounselingbyPatient}
              />
              <Route
                path=":id/views"
                element={<ViewCounselingById />}
                loader={LoadgetViewCounseling}
              />
            </Route>
          </Route>

          <Route path="appointment" element={<MainLayout />}>
            <Route index element={<Appointment />} />
          </Route>
          <Route path="addpatients" element={<MainLayout />}>
            <Route index element={<AddpatientPage />} />
          </Route>
        </Route>

        <Route path="adds" element={<Log />} />
       

        {/* <Route path="login" element={<LoginPage />} action={loginAction(auth)}/> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}
