import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import heartImage from '../assets/heart/heart-like.png';

import {
  Container,
  PostImageContainer,
  PostImage,
  HeartLikeImage,
  InteractionContainer,
  Icon
} from './styles';

export default function Post() {

  const [isLiked, setIsLiked] = useState(false);

  const likeImageOpacity = useSharedValue(0);
  const likeImageScale = useSharedValue(1);

  const iconLikeStyle = useAnimatedStyle(() => {
    return {
      opacity: likeImageOpacity.value,
      transform: [{ scale: likeImageScale.value }],
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      position: 'absolute',
    }
  });

  const likePost = () => {
    setIsLiked(prev => !prev);
  }

  const handleLikePostIndicator = () => {
    likeImageOpacity.value = withTiming(
      1,
      {
        duration: 200,
        easing: Easing.ease
      }, () => {
        'worklet'
        runOnJS(likePost)();
        likeImageScale.value = withTiming(
          1.25,
          {
            duration: 200,
            easing: Easing.ease
          }, () => {
            likeImageScale.value = withTiming(
              1,
              {
                duration: 200,
                easing: Easing.ease
              },
              () => {
                likeImageOpacity.value = withTiming(
                  0,
                  {
                    duration: 300,
                    easing: Easing.ease
                  }
                )
              }
            )
          }
        )
      }
    )
  };

  return (
    <Container>
      <TapGestureHandler numberOfTaps={2} onActivated={handleLikePostIndicator}>
        <PostImageContainer>
          <PostImage source={{ uri: 'https://images.pexels.com/photos/8388229/pexels-photo-8388229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} />
          <Animated.View style={iconLikeStyle}>
            <HeartLikeImage source={heartImage} />
          </Animated.View>
        </PostImageContainer>
      </TapGestureHandler>

      <InteractionContainer>
        <TouchableOpacity onPress={handleLikePostIndicator}>
          <Icon isLiked={isLiked} name='heart' />
        </TouchableOpacity>
      </InteractionContainer>
    </Container>
  );
}


