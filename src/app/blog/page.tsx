'use client'
import React, { Fragment, useMemo, useState } from 'react';
import Image from 'next/image';

import { usePosts } from '@/contexts/posts';

import { techList, typeFilter } from '../utils/constants';

import IconButton from '@/components/IconButton';
import Card from './components/Card';
import Link from 'next/link';

const Blog: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { posts } = usePosts()

  const toggle = () => setShowAll(!showAll)

  const lastPost = useMemo(() => {
    return posts[posts.length - 1] || {} as IPost;
  }, [posts])

  const techArray: any = techList

  if(!posts) return <Fragment />

  return (
    <div className='flex flex-col p-4 md:p-16'>
      <section>
        <div className='flex flex-col md:flex-row'>
          <Image 
            src={lastPost?.banner?.url} 
            alt={lastPost?.slug} 
            width={640} 
            height={360}
            className='flex w-full object-contain rounded md:w-2/4'
          />
          <div className='flex flex-col w-full mt-4 md:w-2/4 md:pl-8'>
            <Link href={`/blog/post/${lastPost?.slug}`}>
              <h1 className='title bold leading-9 max-w-lg'>
                {lastPost.title}
              </h1>
            </Link>
            <div className='flex flex-col mt-4 mb-3 overflow-hidden c-light-2'>
              {lastPost.subtitle}
            </div>
            <hr className='mb-4'/>
            <div>
              <span className='text-xs c-light uppercase l-space-2 semi-bold'>Tecnologias:</span>
              <ul className='flex flex-row flex-wrap mt-2'>
                {
                  lastPost?.tech?.split(',')?.map(item => {
                    const tech: Tech = techArray[item]
                    return (
                      <li key={lastPost.slug+'-'+item} className='mr-2'>
                        <IconButton link={tech.link} Icon={tech.Icon} background={tech.background} color={tech.color} size='small' name="Tech"/>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div>
              <ul className='flex flex-row flex-wrap mt-4'>
                {
                  lastPost?.type?.split(',')?.map(item => {
                    return (
                      <li 
                        key={lastPost.slug+'-tech-'+item} 
                        className='flex cursor-default text-xs rounded-full p-1 pr-4 pl-4 mr-2 bg-black text-white'
                      >
                        { item }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-16'>
        <div className='flex flex-row items-center justify-between w-full mb-4'>
          <h3 className='bold'>Outros posts</h3>
          {/* <ul className='flex flex-row items-center'>
            <span>Filtros:</span>
            { 
              typeFilter.map((filter) => (
                <li key={`search-filter--${filter}`} className='flex rounded-full p-4 pt-1 pb-1 ml-2 cursor-pointer bg-gray-300 text-white hover:bg-black'>
                  {filter}
                </li>
              ))
            }
          </ul> */}
        </div>
        <ul className='flex flex-row flex-wrap justify-start gap-4'>
          {
            posts?.slice(0, showAll ? posts?.length - 1 : 6).map(post => (
              <li key={post.slug} className='flex w-full mt-4 md:w-64'>
                <Card post={post}/>
              </li>  
            ))
          }
        </ul>
        {
          posts?.length > 7 && !showAll ?
          <div className='flex mt-8 text-center text-blue-400 w-full justify-center cursor-pointer' onClick={toggle}>
            Ver todos
          </div> : ''
        }
      </section>
    </div>
  );
}

export default Blog;