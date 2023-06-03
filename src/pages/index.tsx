import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Box, TextField, Typography, InputAdornment, InputLabel } from '@mui/material';
import { ReactElement, useState, FocusEvent } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';

export default function Home(): ReactElement {
  const [searchInput, setSearchInput] = useState<string>('');

  const [isSearchInputFocused, setIsSearchInputFocused] = useState<boolean>(false);

  const keywords: string[] = ['filter', 'group', 'cluster'];

  console.log(searchInput);

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  function searchInputOnFocusHandler(event: FocusEvent<HTMLInputElement>): void {
    setIsSearchInputFocused(true);
  }

  function searchInputOnBlurHandler(event: FocusEvent<HTMLInputElement>): void {
    setIsSearchInputFocused(false);
  }

  function setSearchInputHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchInput(event.target.value);
  }

  // this function is called in each component re-render. Both "search input" and "input focus/blur" can trigger re-rendering which will call this function to return output dynamically
  function displayStyledInputHandler(searchInput: string, keywords: string[]): ReactElement[] {
    const words = searchInput.split(' ');
    const typographies: ReactElement[] = words.map((word: string, index: number) => {
      if (keywords.includes(word.toLowerCase())) {
        return (
          <Typography
            key={index}
            bgcolor={'#a6badf'}
            fontWeight={'medium'}
            fontSize={20}
            component={'span'}
            padding={'5px'}
            marginLeft={'5px'}
            borderRadius={'5px'}
            fontFamily={'Montserrat'}
          >
            {word}
          </Typography>
        );
      } else {
        return (
          <Typography key={index} fontSize={20} component={'span'} fontFamily={'Montserrat'}>
            {' '}
            {word}
          </Typography>
        );
      }
    });
    if (isSearchInputFocused) {
      typographies.push(
        <Typography key={words.length} fontSize={20} component={'span'} fontFamily={'Montserrat'}>
          {'|'}
        </Typography>
      );
      return typographies;
    }
    return typographies;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box padding='20px'>
      <Box display={'inline-block'}>
        <Box bgcolor='white' padding='15px 10px' display='flex' alignItems={'center'} boxShadow={3} borderRadius={'10px'}>
          <Image alt='main icon' width='22' height='22' quality={100} src='https://www.knowd.ai/_next/image?url=%2Flogo.gif&w=32&q=75' />
          <Typography fontWeight={'bold'} fontSize={'16px'} padding={'0px 10px'} borderRight='2px solid #dbc9c9'>
            Knowd
          </Typography>
          <Typography fontWeight={'bold'} fontSize={'20px'} padding={'0px 10px'} borderRight='2px solid #dbc9c9'>
            Demo Project
          </Typography>
          <Box display={'flex'} justifyContent='space-between' padding={'0px 10px'} alignItems={'center'}>
            <HomeOutlinedIcon
              style={{ fontSize: 25, margin: '0px 10px' }}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  opacity: 0.75,
                  cursor: 'pointer',
                  transform: 'translateY(-5px)',
                },
              }}
            />
            <SettingsSuggestOutlinedIcon
              style={{ fontSize: 25, margin: '0px 10px' }}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  opacity: 0.75,
                  cursor: 'pointer',
                  transform: 'translateY(-5px)',
                },
              }}
            />
            <FilterVintageOutlinedIcon
              style={{ fontSize: 25, margin: '0px 10px' }}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  opacity: 0.75,
                  cursor: 'pointer',
                  transform: 'translateY(-5px)',
                },
              }}
            />
            <ContactlessOutlinedIcon
              style={{ fontSize: 25, margin: '0px 10px' }}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  opacity: 0.75,
                  cursor: 'pointer',
                  transform: 'translateY(-5px)',
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Box width={'100%'} display={'flex'} marginTop={'250px'} justifyContent={'center'}>
        <Box display={'flex'} justifyContent={'start'} width={'70%'} bgcolor={'white'} borderRadius={'10px'} padding={'10px 20px'} boxShadow={7}>
          <Image alt='main icon' width='32' height='32' quality={100} src='https://www.knowd.ai/_next/image?url=%2Flogo.gif&w=32&q=75' />
          <Box position='relative' marginLeft={'20px'} width={'100%'}>
            <Box position='absolute' top={0} left={0} zIndex={2} bgcolor='transparent' width={'100%'}>
              {displayStyledInputHandler(searchInput, keywords)}
            </Box>
            {searchInput === '' && (
              <Box>
                <Typography position='absolute' top={0} left={0} zIndex={1} fontSize={20} color={'#adadad'} bgcolor={'transparent'}>
                  Start querying...
                </Typography>
              </Box>
            )}
            <TextField
              onFocus={searchInputOnFocusHandler}
              onBlur={searchInputOnBlurHandler}
              value={searchInput}
              onChange={setSearchInputHandler}
              variant='standard'
              fullWidth
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 3,
                backgroundColor: 'transparent',
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  color: 'transparent',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
