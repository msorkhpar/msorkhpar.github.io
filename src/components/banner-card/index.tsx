import { FALLBACK_IMAGE } from '../../constants';
import { Banner } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

interface BannerCardProps {
  banner: Banner | null;
  loading: boolean;
}

/**
 * Renders an BannerCard component.
 * @param banner - The banner object.
 * @param loading - A boolean indicating if the profile is loading.
 * @returns JSX element representing the AvatarCard.
 */
const BannerCard: React.FC<BannerCardProps> = ({
  banner,
  loading,
}): JSX.Element => {
  return (
    <div className="grid place-items-center">
      {!loading && banner ? (
        <LazyImage
          src={banner.imageURL ? banner.imageURL : FALLBACK_IMAGE}
          alt={banner.name?.length ? banner.name : ''}
          className="w-full h-full rounded-lg shadow-lg"
          placeholder={skeleton({
            widthCls: 'w-full',
            heightCls: 'h-full',
            shape: '',
          })}
        />
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default BannerCard;
