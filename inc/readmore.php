<?php

add_filter( 'excerpt_more', 'secondpress_custom_excerpt_more' );

if ( ! function_exists( 'secondpress_custom_excerpt_more' ) ) {
/**
* Removes the ... from the excerpt read more link
*
* @param string $more The excerpt.
*
* @return string
*/
function secondpress_custom_excerpt_more( $more ) {
if ( ! is_admin() ) {
$more = '';
}
return $more;
}
}

add_filter( 'wp_trim_excerpt', 'secondpress_all_excerpts_get_more_link' );

if ( ! function_exists( 'secondpress_all_excerpts_get_more_link' ) ) {
/**
* Adds a custom read more link to all excerpts, manually or automatically generated
*
* @param string $post_excerpt Posts's excerpt.
*
* @return string
*/
function secondpress_all_excerpts_get_more_link( $post_excerpt ) {
if ( ! is_admin() ) {
$post_excerpt = $post_excerpt . ' [...]<p><a class="btn btn-secondary secondpress-read-more-link" href="' . esc_url( get_permalink( get_the_ID() ) ) . '">' . __( 'Read More...',
        'secondpress' ) . '</a></p>';
}
return $post_excerpt;
}
}