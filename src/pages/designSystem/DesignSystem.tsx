import Layout from "@/components/Layout";
import PostForm from "@/components/custom/PostForm";
import JobControlList from "@/components/custom/JobsControlDisplay";
import JobList from "@/components/custom/Jobs"


const DesignSystem = () => {
    return (
        <Layout>
            <PostForm />
            <JobList />
            <JobControlList />
        </Layout>
    )
}

export default DesignSystem
