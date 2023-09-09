import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AdminAddCategoryPage from "./pages/admin/categories/AdminAddCategoryPage";
import AdminCategoriesPage from "./pages/admin/categories/AdminCategoriesPage";
import AdminUpdateCategoryPage from "./pages/admin/categories/AdminUpdateCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminQuizzesPage from "./pages/admin/quizzes/AdminQuizzesPage";
import AdminAddQuiz from "./pages/admin/quizzes/AdminAddQuiz";
import AdminUpdateQuiz from "./pages/admin/quizzes/AdminUpdateQuiz";
import AdminAddQuestionsPage from "./pages/admin/questions/AdminAddQuestionsPage";
import AdminUpdateQuestionPage from "./pages/admin/questions/AdminUpdateQuestionPage";
import UserQuizzesPage from "./pages/users/UserQuizzesPage";
import UserQuizManualPage from "./pages/users/UserQuizManualPage";
import UserQuestionsPage from "./pages/users/UserQuestionsPage";
import UserQuizResultPage from "./pages/users/UserQuizResultPage";
import AdminQuizResultPage from "./pages/admin/AdminQuizResultPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import UserProfileUpdate from "./pages/users/UserProfileUpdate";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminProfileUpdate from "./pages/admin/AdminProfileUpdatePage";
import UserProfilePage from "./pages/users/UserProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import AdminQuestionsPage from "./pages/admin/questions/AdminQuestionsPage";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUsPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminQuestions" element={<AdminQuestionsPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminProfile" element={<AdminProfilePage />} />
        <Route path="/adminCategories" element={<AdminCategoriesPage />} />
        <Route path="/adminAddCategory" element={<AdminAddCategoryPage />} />
       
        <Route
          path="/adminUpdateCategory/:catId"
          element={<AdminUpdateCategoryPage />}
        />
        <Route path="/adminProfileUpdate" element={<AdminProfileUpdate />} />
        {/* Other routes */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/adminQuizzes" element={<AdminQuizzesPage />} />
        <Route path="/adminAddQuiz" element={<AdminAddQuiz />} />
        <Route path="/adminUpdateQuiz/:quizId" element={<AdminUpdateQuiz />} />
        <Route path="/adminQuestions" element={<footer/>}/>
        <Route path="/adminAddQuestion" element={<AdminAddQuestionsPage />} />
        <Route path="/adminallResult" element={<AdminQuizResultPage />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route
          path="/adminUpdateQuestion/:quesId"
          element={<AdminUpdateQuestionPage />}
        />


        <Route path="/userProfileUpdate" element={<UserProfileUpdate/>} />
        

        <Route path="/quizzes" element={<UserQuizzesPage />} />
        <Route path="/quiz/*" element={<UserQuizzesPage />} />
        <Route path="/quizManual/" element={<UserQuizManualPage />} />
        <Route path="/questions/" element={<UserQuestionsPage />} />
        <Route path="/quizResults/" element={<UserQuizResultPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
      </Routes>
     
      <Footer/>
    </Router>
  );
};

export default App;
