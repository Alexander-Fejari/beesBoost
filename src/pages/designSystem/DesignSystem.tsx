import Layout from "@/components/Layout";
import JobBlockDetail from "@/components/custom/JobBlockDetail";
import PostForm from "@/components/custom/PostForm";
import JobList from "@/components/custom/Jobs";


const DesignSystem = () => {
    return (
        <Layout>
            <JobBlockDetail />
            <PostForm />
            <JobList />

        </Layout>
    )
}

export default DesignSystem
