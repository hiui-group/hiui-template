import { Avatar, AvatarProps } from "@hi-ui/hiui"

export const Image: React.FC<ImageProps> = (props) => {
  return <Avatar size="sm" {...props} style={{backgroundColor: 'transparent'}} />
}

export interface ImageProps extends AvatarProps{
}
