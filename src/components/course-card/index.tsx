import { Fragment } from 'react';
import { MdOutlineSchool } from 'react-icons/md';
import LazyImage from '../lazy-image';
import { ga, skeleton } from '../../utils';
import { SanitizedCourses } from '../../interfaces/sanitized-config';

const CourseCard = ({
  courses,
  loading,
  googleAnalyticsId,
}: {
  courses: SanitizedCourses;
  loading: boolean;
  googleAnalyticsId?: string;
}) => {
  const renderSkeleton = () =>
    courses.items.map((_, index) => (
      <div className="card shadow-md card-sm bg-base-100" key={index}>
        <div className="p-6 h-full w-full">
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-6', className: 'mb-4' })}
          {skeleton({
            widthCls: 'w-full',
            heightCls: 'h-4',
            className: 'mb-2',
          })}
          {skeleton({
            widthCls: 'w-full',
            heightCls: 'h-4',
            className: 'mb-2',
          })}
          {skeleton({ widthCls: 'w-2/3', heightCls: 'h-4', className: 'mb-4' })}
          {skeleton({ widthCls: 'w-1/2', heightCls: 'h-6' })}
        </div>
      </div>
    ));

  const renderCourses = () =>
    courses.items.map((item, index) => (
      <a
        className="card shadow-md card-sm bg-base-100 cursor-pointer hover:shadow-xl transition-shadow"
        key={index}
        href={item.link}
        onClick={() => {
          if (googleAnalyticsId) {
            ga.event('Click Course', { course: item.title });
          }
        }}
      >
        {item.imageUrl && (
          <figure className="h-40 overflow-hidden">
            <LazyImage
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              placeholder={skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            />
          </figure>
        )}
        <div className="p-6 h-full w-full flex flex-col">
          <h2 className="font-semibold text-base-content text-lg mb-2">
            {item.title}
          </h2>
          {item.description && (
            <p className="text-base-content/70 text-sm">{item.description}</p>
          )}
          {(item.topics.length > 0 || item.note) && (
            <div className="mt-auto pt-4">
              {item.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="badge badge-primary badge-outline text-xs h-auto py-1"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
              {item.note && (
                <p className="mt-4 text-xs italic text-base-content/50">
                  {item.note}
                </p>
              )}
            </div>
          )}
        </div>
      </a>
    ));

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body p-8">
            <div className="flex items-start space-x-3 mb-8">
              {loading ? (
                skeleton({
                  widthCls: 'w-12',
                  heightCls: 'h-12',
                  className: 'rounded-xl',
                })
              ) : (
                <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-primary/10 rounded-xl">
                  <MdOutlineSchool className="text-2xl" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-base-content">
                  {loading
                    ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
                    : courses.header}
                </h3>
                {courses.intro && (
                  <div className="text-base-content/60 text-xs sm:text-sm mt-1">
                    {loading
                      ? skeleton({ widthCls: 'w-full', heightCls: 'h-4' })
                      : courses.intro}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? renderSkeleton() : renderCourses()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseCard;
