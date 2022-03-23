<?php
/**
 * Theme Support for Woo-commerce
 * @https://docs.woocommerce.com/document/woocommerce-theme-developer-handbook/
 */
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', 'secondpress_add_woocommerce_support' );
function secondpress_add_woocommerce_support() {
    add_theme_support( 'woocommerce', array(
        'thumbnail_image_width' => 150,
        'single_image_width'    => 300,

        'product_grid'          => array(
            'default_rows'    => 3,
            'min_rows'        => 2,
            'max_rows'        => 8,
            'default_columns' => 4,
            'min_columns'     => 2,
            'max_columns'     => 5,
        ),
    ) );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-slider' );

    // add_filter('woocommerce_form_field_args','wc_form_field_args',10,3);
}

remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
add_action('woocommerce_before_main_content', 'secondpress_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'secondpress_wrapper_end', 10);

function secondpress_wrapper_start() {
    echo '<div class="custom-woocommerce-wrapper" id="main">';
}
function secondpress_wrapper_end() {
    echo '</div>';
}


