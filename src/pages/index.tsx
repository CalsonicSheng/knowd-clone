import Image from 'next/image';
import { Box, TextField, Typography } from '@mui/material';
import { ReactElement, useState, useRef, useEffect, KeyboardEvent } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import { actionKeywords, DataSources } from '@/constants/keysAndOptions';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home(): ReactElement {
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const [selectedDataSourceIndex, setSelectedDataSourceIndex] = useState<number>(-1);

  const [isDataSourceDropdownOpen, setIsDataSourceDropdownOpen] = useState<boolean>(false);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState<boolean>(false);

  const DataSourceDropdownRef = useRef<HTMLUListElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // to track user raw search text input
  function setSearchInputHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchInput(event.target.value);
  }

  // detecting "/" and "esc" key press to open and close DataSourceDropdown logics
  useEffect(() => {
    const handleGlobalKeyUp = (event: globalThis.KeyboardEvent) => {
      if (event.key === '/') {
        setIsDataSourceDropdownOpen(true);
      }
      // reset everything when user press "esc" key
      if (event.key === 'Escape') {
        setIsDataSourceDropdownOpen(false);
        setSelectedDataSourceIndex(-1);
        setSelectedDataSource('');
        setSearchInput(searchInput.substring(0, searchInput.length - 1));
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener('keyup', handleGlobalKeyUp);
    return () => window.removeEventListener('keyup', handleGlobalKeyUp);
  }, []);

  // to handle dropdown auto focus when DataSourceDropdown is open
  useEffect(() => {
    if (isDataSourceDropdownOpen && DataSourceDropdownRef.current) {
      console.log('dropdown focus runs');
      DataSourceDropdownRef.current.focus();
    }
  }, [isDataSourceDropdownOpen]);

  useEffect(() => {
    if (selectedDataSource !== '') {
      setSearchInput(searchInput.substring(0, searchInput.length - 1) + selectedDataSource);
    }
  }, [selectedDataSource]);

  // to handle keyboard event logic for dataSourceDropdown
  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        setSelectedDataSourceIndex((prevIndex) => (prevIndex < DataSources.length - 1 ? prevIndex + 1 : prevIndex));
        break;
      case 'ArrowUp':
        setSelectedDataSourceIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;

      // reset everything when user press "enter" key
      case 'Enter':
        setSelectedDataSource(DataSources[selectedDataSourceIndex]);
        setIsDataSourceDropdownOpen(false);
        setSelectedDataSourceIndex(-1);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        break;
      default:
        break;
    }
  };

  // this function is called in each component re-render. Both "search input" and "input focus/blur" can trigger re-rendering which will call this function to return output dynamically
  function displayStyledInputHandler(searchInput: string, actionKeywords: string[]): ReactElement[] {
    const words = searchInput.split(' ');
    const processedWords: ReactElement[] = words.map((word: string, index: number) => {
      switch (word.toLowerCase()) {
        // styling for each different action keywords
        case actionKeywords[0]:
          return (
            <Typography
              height={'100%'}
              key={index}
              color={'#437de9'}
              bgcolor={'#a2bbe9'}
              fontWeight={'medium'}
              fontSize={20}
              component={'span'}
              padding={'5px'}
              marginLeft={'5px'}
              borderRadius={'5px'}
              fontFamily={'Montserrat'}
              display={'flex'}
              alignItems={'center'}
            >
              {word}
            </Typography>
          );
        case actionKeywords[1]:
          return (
            <Typography
              height={'100%'}
              key={index}
              color={'#e04237'}
              bgcolor={'#df8f89'}
              fontWeight={'medium'}
              fontSize={20}
              component={'span'}
              padding={'5px'}
              marginLeft={'5px'}
              borderRadius={'5px'}
              fontFamily={'Montserrat'}
              display={'flex'}
              alignItems={'center'}
            >
              {word}
            </Typography>
          );
        case actionKeywords[2]:
          return (
            <Typography
              height={'100%'}
              key={index}
              color={'#bc43d4'}
              bgcolor={'#cf92db'}
              fontWeight={'medium'}
              fontSize={20}
              component={'span'}
              padding={'5px'}
              marginLeft={'5px'}
              borderRadius={'5px'}
              fontFamily={'Montserrat'}
              display={'flex'}
              alignItems={'center'}
            >
              {word}
            </Typography>
          );
        // dropdown component for "/" for choosing key sources
        case '/':
          return (
            <Box position={'relative'} key={index}>
              <Typography fontSize={20} component={'span'} fontFamily={'Montserrat'} color={'black'} marginLeft={'5px'} display={'flex'} alignItems={'center'}>
                /
              </Typography>
              <Box
                component='ul'
                position={'absolute'}
                top={15}
                left={20}
                zIndex={4}
                width={'auto'}
                bgcolor={'white'}
                boxShadow={4}
                borderRadius={'5px'}
                onKeyUp={handleKeyUp}
                tabIndex={0}
                ref={DataSourceDropdownRef}
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                }}
              >
                {DataSources.map((e: string, index: number) => {
                  return (
                    <Box
                      component='li'
                      bgcolor={selectedDataSourceIndex === index ? '#d3d3d3' : 'white'}
                      color={'#999'}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#d3d3d3',
                        },
                      }}
                      padding={'5px 10px'}
                      borderRadius={'5px'}
                      onClick={() => {
                        setSelectedDataSource(e);
                        setIsDataSourceDropdownOpen(false);
                      }}
                      key={index}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      {e === 'apple' ? (
                        <AppleIcon />
                      ) : e === 'facebook' ? (
                        <FacebookIcon />
                      ) : e === 'google' ? (
                        <GoogleIcon />
                      ) : e === 'instagram' ? (
                        <InstagramIcon />
                      ) : e === 'twitter' ? (
                        <TwitterIcon />
                      ) : null}
                      <Typography fontSize={18} component={'span'} fontFamily={'Montserrat'} color={'black'} marginLeft={'20px'}>
                        {e.substring(0, 1).toUpperCase() + e.substring(1, e.length)}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        case 'apple':
        case 'facebook':
        case 'google':
        case 'instagram':
        case 'twitter':
          return (
            <Typography
              height={'100%'}
              key={index}
              color={'#25a1db'}
              bgcolor={'#97c5da'}
              fontWeight={'medium'}
              fontSize={20}
              component={'span'}
              padding={'5px'}
              marginLeft={'5px'}
              borderRadius={'5px'}
              fontFamily={'Montserrat'}
              display={'flex'}
              alignItems={'center'}
            >
              {word.substring(0, 1).toUpperCase() + word.substring(1, word.length)}
            </Typography>
          );
        // this is equavlent to final "else" in switch statement, for handle non keywords
        default:
          return (
            <Typography
              key={index}
              fontSize={20}
              component={'span'}
              fontFamily={'Montserrat'}
              color={'black'}
              height={'100%'}
              marginLeft={'5px'}
              display={'flex'}
              alignItems={'center'}
            >
              {word}
            </Typography>
          );
      }
    });

    // ---------------------------------------------------------------------------------------

    if (isSearchInputFocused) {
      processedWords.push(<Box className='input-indicator' key={words.length} />);
      return processedWords;
    }
    return processedWords;
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
          <Box position='relative' marginLeft={'15px'} width={'100%'}>
            <Box position='absolute' top={0} left={0} zIndex={2} bgcolor='transparent' width={'100%'} height={'100%'} display={'flex'} alignItems={'center'}>
              {displayStyledInputHandler(searchInput, actionKeywords)}
            </Box>
            {searchInput === '' && (
              <Typography
                marginLeft={'8px'}
                position='absolute'
                top={0}
                left={0}
                zIndex={1}
                fontSize={20}
                fontFamily={'Montserrat'}
                color={'#adadad'}
                bgcolor={'transparent'}
                height={'100%'}
                display={'flex'}
                alignItems={'center'}
              >
                Start querying...
              </Typography>
            )}
            <TextField
              inputRef={searchInputRef}
              onFocus={() => {
                setIsSearchInputFocused(true);
              }}
              onBlur={() => {
                setIsSearchInputFocused(false);
              }}
              value={searchInput}
              onChange={setSearchInputHandler}
              variant='standard'
              fullWidth
              sx={{
                height: '100%',
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
