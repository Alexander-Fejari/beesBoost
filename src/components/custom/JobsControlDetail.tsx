import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postFormSchema, PostValues } from "@/components/formSchema"; // Adjust the import path
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/Store"; // Adjust the import path
import useJobStore, { JobDetail } from '@/store/JobStore'; // Adjust the import path

const EditPostForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token, username } = useAuthStore(); // Get the token from the store
  const { jobId } = useParams<{ jobId: string }>();
  const { jobDetails, fetchJobDetail, isLoading } = useJobStore(state => ({
    jobDetails: state.jobDetails,
    fetchJobDetail: state.fetchJobDetail,
    isLoading: state.isLoading,
  }));

  const { register, handleSubmit, setValue, formState, reset } = useForm<PostValues>({
    resolver: zodResolver(postFormSchema),
  });

  useEffect(() => {
    if (jobId) {
      fetchJobDetail(jobId);
    }
  }, [jobId, fetchJobDetail]);

  useEffect(() => {
    if (jobId && jobDetails[jobId]) {
      const job = jobDetails[jobId] as JobDetail;
      setValue("field", job.field);
      setValue("function", job.function);
      setValue("start_date", job.startDate);
      setValue("duration", job.duration);
      setValue("title", job.title);
      setValue("location", job.location);
      setValue("body.description", job.descriptionShort);
      setValue("body.requirements", job.experiences.join(', '));
      setValue("body.nice_to_have", job.nice_to_have.join(', '));
      setValue("body.benefits", job.benefits.join(', '));
    }
  }, [jobId, jobDetails, setValue]);

  const onSubmit: SubmitHandler<PostValues> = async (values) => {
    try {
      const transformedValues = {
        ...values,
        poster_id: username,
        body: {
          ...values.body,
          requirements: values.body.requirements.split(',').map((item: string) => item.trim()),
          nice_to_have: values.body.nice_to_have?.split(',').map((item: string) => item.trim()) || [],
          benefits: values.body.benefits.split(',').map((item: string) => item.trim()),
        }
      };

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/post/updatePost/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transformedValues),
      });

      if (!response.ok) {
        throw new Error('Failed to update the post');
      }

      navigate("/dashboard/settings");
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const onReset = () => {
    reset();
  };

  if (isLoading[jobId]) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="field">{t('postForm.field')}</Label>
        <Input
          id="field"
          type="text"
          placeholder="Field"
          {...register("field")}
          error={formState.errors.field?.message}
        />
        {formState.errors.field && <p className="error-message">{formState.errors.field.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="function">{t('postForm.function')}</Label>
        <Input
          id="function"
          type="text"
          placeholder="Function"
          {...register("function")}
          error={formState.errors.function?.message}
        />
        {formState.errors.function && <p className="error-message">{formState.errors.function.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="start_date">{t('postForm.startDate')}</Label>
        <Input
          id="start_date"
          type="date"
          {...register("start_date")}
          error={formState.errors.start_date?.message}
        />
        {formState.errors.start_date && <p className="error-message">{formState.errors.start_date.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="duration">{t('postForm.duration')}</Label>
        <Input
          id="duration"
          type="number"
          placeholder="Duration"
          {...register("duration", { valueAsNumber: true })}
          error={formState.errors.duration?.message}
        />
        {formState.errors.duration && <p className="error-message">{formState.errors.duration.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="title">{t('postForm.title')}</Label>
        <Input
          id="title"
          type="text"
          placeholder="Title"
          {...register("title")}
          error={formState.errors.title?.message}
        />
        {formState.errors.title && <p className="error-message">{formState.errors.title.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="location">{t('postForm.location')}</Label>
        <Input
          id="location"
          type="text"
          placeholder="Location"
          {...register("location")}
          error={formState.errors.location?.message}
        />
        {formState.errors.location && <p className="error-message">{formState.errors.location.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="description">{t('postForm.description')}</Label>
        <Input
          id="description"
          placeholder="Description"
          {...register("body.description")}
          error={formState.errors.body?.description?.message}
        />
        {formState.errors.body?.description && <p className="error-message">{formState.errors.body.description.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="requirements">{t('postForm.requirements')}</Label>
        <Input
          id="requirements"
          placeholder="Requirements (comma separated)"
          {...register("body.requirements")}
          error={formState.errors.body?.requirements?.message}
        />
        {formState.errors.body?.requirements && <p className="error-message">{formState.errors.body.requirements.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="nice_to_have">{t('postForm.niceToHave')}</Label>
        <Input
          id="nice_to_have"
          placeholder="Nice to have (comma separated)"
          {...register("body.nice_to_have")}
          error={formState.errors.body?.nice_to_have?.message}
        />
        {formState.errors.body?.nice_to_have && <p className="error-message">{formState.errors.body.nice_to_have.message}</p>}
      </section>
      <section className="flex flex-col items-start space-y-2">
        <Label htmlFor="benefits">{t('postForm.benefits')}</Label>
        <Input
          id="benefits"
          placeholder="Benefits (comma separated)"
          {...register("body.benefits")}
          error={formState.errors.body?.benefits?.message}
        />
        {formState.errors.body?.benefits && <p className="error-message">{formState.errors.body.benefits.message}</p>}
      </section>
      <section className="flex justify-center items-center space-x-8">
        <Button type="submit" disabled={formState.isSubmitting}>
          {t('postForm.submit')}
        </Button>
        <Button type="reset" variant="destructive" onClick={onReset}>
          {t('postForm.reset')}
        </Button>
      </section>
    </form>
  );
};

export default EditPostForm;
