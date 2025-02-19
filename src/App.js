import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard/Header';
import Profile from './component/Dashboard/Profile';
import AdminLogin from './component/Login/AdminLogin';
import ResetPassword from './component/ResetPassword/ResetPassword';
import Roles from './Pages/Roles';
import MasterNumber from './Pages/MasterNumbers/MasterNumber';
import SystemTypes from './Pages/SystemTypes';
import DailyForecast from './component/DailyForecast/DailyForecast';
import PrivateRoute from './PrivateRoute'; 
import User from './component/Users/User';
import UserMessages from './Pages/UserMessages/UserMessages';
import { AppProvider } from './ContextApi/userContext';
import GeneralSettings from './Pages/GeneralSettings/GeneralSettings';
import DashBoard from './Pages/Dashboard';
import PaymentSetting from './Pages/PaymentSetting/PaymentSetting';
import SystemModules from './Pages/SystemModules/SystemModules';
import NameReading from './Pages/NameReading/NameReading';
import DobReading from './Pages/DobReading/DobReading';
import LuckiestParameters from './Pages/LuckiestParameters/LuckiestParameters';
import PrimaryNumbers from './Pages/PrimaryNumbers/PrimaryNumbers';
import MagicBox from './Pages/MagicBox/MagicBox';
import ElementalNumber from './Pages/ElementalNumber/ElementalNumber';
import DestinyNumbers from './Pages/DestinyNumbers/DestinyNumbers';
import VideosPage from './Pages/VideosPage/VideosPage';
import LifeCoachDesc from './Pages/LifeCoachDesc/LifeCoachDesc';
import SubscriptionPirce from './Pages/SubscriptionPrice/SubscriptionPirce';
import ZodiacSign from './Pages/ZodiacSign/ZodiacSign';
import PlanetNumbers from './Pages/PlanetNumbers/PlanetNumbers';
import LifeCycle from './Pages/LifeCycle/LifeCycle';
import LifeChanges from './Pages/LifeChanges/LifeChanges';
import CompaitablePartner from './Pages/CompaitablePartner/CompaitablePartner';
import PartnerRelationships from './Pages/PartnerRelationships/PartnerRelationships';
import ChildrenPage from './Pages/ChildrenPage/ChildrenPage';
import CompatibilityPercentage from './Pages/CompatibilityPercentage/CompatibilityPercentage';
import CompatibiltyDesc from './Pages/CompatibiltyDesc/CompatibiltyDesc';
import UserDetailedData from './component/Users/UserDetailedData';
import HealthReading from './Pages/HealthReading/HealthReading';
import HealthPrecaution from './Pages/HealthPrecaution/HealthPrecaution';
import HealthSuggestion from './Pages/HealthSuggestion/HealthSuggestion';
import HealthCycle from './Pages/HealthCycle/HealthCycle';
import PersonalYear from './Pages/PersonalYear/PersonalYear';
import PersonalMonth from './Pages/PersonalMonth/PersonalMonth';
import PersonalWeek from './Pages/PersonalWeek/PersonalWeek';
import PersonalDay from './Pages/PersonalDay/PersonalDay';
import UniversalYear from './Pages/UniversalYear/UniversalYear';
import UniversalMonth from './Pages/UniversalMonth/UniversalMonth';
import UniversalDay from './Pages/UniversalDay/UniversalDay';
import FavParameters from './Pages/FavParameters/FavParameters';
import UnfavParamaters from './Pages/UnfavParameters/UnfavParamaters';
import BasicParenting from './Pages/BasicParenting/BasicParenting';
import DetailParenting from './Pages/DetailParenting/DetailParenting';
import BasicMoney from './Pages/BasicMoney/BasicMoney';
import DetailedMoney from './Pages/DetailedMoney/DetailedMoney';
import ModuleEdit from './Pages/SystemModules/ModuleEdit/ModuleEdit';
import MasterShow from './Pages/MasterNumbers/MasterShow/MasterShow';
import MasterEdit from './Pages/MasterNumbers/MasterEdit/MasterEdit';
import ShowComp from './component/ShowComponent/ShowComp';
import EditComponent from './component/EditComponent/EditComponent';
import LuckiestShow from './Pages/LuckiestParameters/LuckiestShow/LuckiestShow';
import LuckiestEdit from './Pages/LuckiestParameters/LuckiestEdit/LuckiestEdit';
import NameReadingShow from './Pages/NameReading/NameReadingShow/NameReadingShow';
import NameReadingEdit from './Pages/NameReading/NameReadingEdit/NameReadingEdit';
import DobReadingEdit from './Pages/DobReading/DobReadingEdit/DobReadingEdit';
import PrimaryNumberShow from './Pages/PrimaryNumbers/PrimaryNumberShow/PrimaryNumberShow';
import PrimaryNumberEdit from './Pages/PrimaryNumbers/PrimaryNumberEdit/PrimaryNumberEdit';
import MagicBoxShow from './Pages/MagicBox/MagicBoxShow/MagicBoxShow';
import MagicBoxEdit from './Pages/MagicBox/MagicBoxEdit/MagicBoxEdit';
import ElementalShow from "./Pages/ElementalNumber/ElementalShow";
import ElementalEdit from './Pages/ElementalNumber/ElementalEdit';
import DestinyShow from "./Pages/DestinyNumbers/DestinyShow";
import DestinyEdit from "./Pages/DestinyNumbers/DestinyEdit";
import VideoShow from "./Pages/VideosPage/VideoShow";
import VideoEdit from "./Pages/VideosPage/VideoEdit";
import AddVideo from "./Pages/VideosPage/AddVideo";
import LifeCoachDescriptionShow from "./Pages/LifeCoachDesc/LifeCoachDescriptionShow"
import LifeCoachDescriptionEdit from './Pages/LifeCoachDesc/LifeCoachDescriptionEdit';
function App() {
  return (
    <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<PrivateRoute element={DashBoard} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/reset" element={<PrivateRoute element={ResetPassword} />} />
        <Route path="/roles" element={<PrivateRoute element={Roles} />} />
        <Route path="/systemtype" element={<PrivateRoute element={SystemTypes} />} />

        <Route path="/modules" element={<PrivateRoute element={SystemModules} />} />
        <Route path="/modules/edit" element={<PrivateRoute element={ModuleEdit} />} />

        <Route path="/Master" element={<PrivateRoute element={MasterNumber} />} />

        <Route path="/show" element={<PrivateRoute element={ShowComp} />} />
        <Route path="/edit" element={<PrivateRoute element={EditComponent} />} />

        <Route path="/namereading" element={<PrivateRoute element={NameReading} />} />
        <Route path="/name_reading/show" element={<PrivateRoute element={NameReadingShow} />} />
        <Route path="/name_reading/edit" element={<PrivateRoute element={NameReadingEdit} />} />

        <Route path="/dobreading" element={<PrivateRoute element={DobReading} />} />
        <Route path="/dobreading/edit" element={<PrivateRoute element={DobReadingEdit} />} />

        <Route path="/luckiest_parameters" element={<PrivateRoute element={LuckiestParameters} />} />
        <Route path="/luckiest_parameters/show" element={<PrivateRoute element={LuckiestShow} />} />
        <Route path="/luckiest_parameters/edit" element={<PrivateRoute element={LuckiestEdit} />} />

        <Route path="/primaryno_types" element={<PrivateRoute element={PrimaryNumbers} />} />
        <Route path="/primaryno_types/show" element={<PrivateRoute element={PrimaryNumberShow} />} />
        <Route path="/primaryno_types/edit" element={<PrivateRoute element={PrimaryNumberEdit} />} />

        <Route path="/magicbox" element={<PrivateRoute element={MagicBox} />} />
        <Route path="/magicbox/show" element={<PrivateRoute element={MagicBoxShow} />} />
        <Route path="/magicbox/edit" element={<PrivateRoute element={MagicBoxEdit} />} />

        <Route path="/elementalno" element={<PrivateRoute element={ElementalNumber} />} />
        <Route path="/elementalno/view" element={<PrivateRoute element={ElementalShow} />} />
        <Route path="/elementalno/edit" element={<PrivateRoute element={ElementalEdit} />} />

        <Route path="/destinyno" element={<PrivateRoute element={DestinyNumbers} />} />
        <Route path="/destinyShow/view" element={<PrivateRoute element={DestinyShow} />} />
        <Route path="/destinyEdit/edit" element={<PrivateRoute element={DestinyEdit} />} />

        <Route path="/videos" element={<PrivateRoute element={VideosPage} />} />
        <Route path="/Add_video" element={<PrivateRoute element={AddVideo} />} />
        <Route path="/video_page/show" element={<PrivateRoute element={VideoShow} />} />
        <Route path="/video_page/edit" element={<PrivateRoute element={VideoEdit} />} />

        <Route path="/lifecoach_descriptions" element={<PrivateRoute element={LifeCoachDesc} />} />
        <Route path="/lifecoach_descriptions/show" element={<PrivateRoute element={LifeCoachDescriptionShow} />} />
        <Route path="/lifecoach_descriptions/edit" element={<PrivateRoute element={LifeCoachDescriptionEdit} />} />

        <Route path="/subscription_price" element={<PrivateRoute element={SubscriptionPirce} />} />
        <Route path="/healthreading" element={<PrivateRoute element={HealthReading} />} />
        <Route path="/healthprecaution" element={<PrivateRoute element={HealthPrecaution} />} />
        <Route path="/healthsuggestion" element={<PrivateRoute element={HealthSuggestion} />} />
        <Route path="/healthcycle" element={<PrivateRoute element={HealthCycle} />} />
        <Route path="/personalyear" element={<PrivateRoute element={PersonalYear} />} />
        <Route path="/personalmonth" element={<PrivateRoute element={PersonalMonth} />} />
        <Route path="/personalweek" element={<PrivateRoute element={PersonalWeek} />} />
        <Route path="/personalday" element={<PrivateRoute element={PersonalDay} />} />
        <Route path="/universalyear" element={<PrivateRoute element={UniversalYear} />} />
        <Route path="/universalmonth" element={<PrivateRoute element={UniversalMonth} />} />
        <Route path="/universalday" element={<PrivateRoute element={UniversalDay} />} />
        <Route path="/fav_parameters" element={<PrivateRoute element={FavParameters} />} />
        <Route path="/unfav_parameters" element={<PrivateRoute element={UnfavParamaters} />} />
        <Route path="/zodic_signs" element={<PrivateRoute element={ZodiacSign} />} />
        <Route path="/planet_numbers" element={<PrivateRoute element={PlanetNumbers} />} />
        <Route path="/life_cycles" element={<PrivateRoute element={LifeCycle} />} />
        <Route path="/life_changes" element={<PrivateRoute element={LifeChanges} />} />
        <Route path="/compatible_partners" element={<PrivateRoute element={CompaitablePartner} />} />
        <Route path="/partner_relationships" element={<PrivateRoute element={PartnerRelationships} />} />
        <Route path="/childrens" element={<PrivateRoute element={ChildrenPage} />} />
        <Route path="/basicparenting" element={<PrivateRoute element={BasicParenting} />} />
        <Route path="/detailparenting" element={<PrivateRoute element={DetailParenting} />} />
        <Route path="/basicmoney" element={<PrivateRoute element={BasicMoney} />} />
        <Route path="/detailedmoney" element={<PrivateRoute element={DetailedMoney} />} />
        <Route path="/compatibility_percentage" element={<PrivateRoute element={CompatibilityPercentage} />} />
        <Route path="/compatibility_description" element={<PrivateRoute element={CompatibiltyDesc} />} />
        <Route path="/DailyForecast" element={<PrivateRoute element={DailyForecast} />} />
        <Route path="/users" element={<PrivateRoute element={User} />} />
        <Route path="/usermessages" element={<PrivateRoute element={UserMessages} />} />
        <Route path="/general-settings" element={<PrivateRoute element={GeneralSettings} />} />
        <Route path="/payment" element={<PrivateRoute element={PaymentSetting} />} />
        <Route path="/userDetailedData" element={<PrivateRoute element={UserDetailedData} />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
export default App;
