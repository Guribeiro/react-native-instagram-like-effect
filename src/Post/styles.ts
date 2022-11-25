import { View, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'

interface IconProps {
  isLiked?: boolean;
}

export const Container = styled(View)`
flex: 1;
justify-content: center;
align-items: center;
padding: 20px;

background: #151417;
`;

export const PostImageContainer = styled(View)`
width: 100%;
height: 300px;
`;

export const PostImage = styled(Image)`
width: 100%;
height: 100%;
`;

export const HeartLikeImage = styled(Image)`
width: 96px;
height: 96px;
`;

export const Icon = styled(Feather) <IconProps>`
color: #FFFFFF;
font-size: 24px;

${({ isLiked }) => isLiked && css`
  color: #e74c3c;
`}
`;

export const InteractionContainer = styled(View)`
width: 100%;
margin-top: 16px;
flex-direction: row;
align-items: center;
`;
