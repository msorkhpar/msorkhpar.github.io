import { Helmet } from 'react-helmet-async';
import { isDarkishTheme } from '../../utils';
import CONFIG from '../../../gitprofile.config';

type HeadTagEditorProps = {
  googleAnalyticsId?: string;
  appliedTheme: string;
};

/**
 * Renders the head tag editor component.
 *
 * @param {HeadTagEditorProps} googleAnalyticsId - The Google Analytics ID.
 * @param {HeadTagEditorProps} appliedTheme - The applied theme.
 * @return {React.ReactElement} The head tag editor component.
 */
const HeadTagEditor: React.FC<HeadTagEditorProps> = ({
  googleAnalyticsId,
  appliedTheme,
}) => {
  return (
    <Helmet>
      <title>{CONFIG.seo.title}</title>
      <meta name='description' content={CONFIG.seo.description} />
      <meta itemProp='image' content={CONFIG.seo.imageURL} />
      <meta
        name="theme-color"
        content={isDarkishTheme(appliedTheme) ? '#000000' : '#ffffff'}
      />

      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          ></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
`}
          </script>
        </>
      )}
      <script type="application/ld+json">
          {JSON.stringify(CONFIG.seo.schema)}
      </script>
    </Helmet>
  );
};

export default HeadTagEditor;
